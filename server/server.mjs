// Zielony Zając – admin backend (prices + photos). Zero dependencies, Node 18+.
//
//   node server.mjs                         start (PORT, default 4810)
//   node server.mjs --set-password <login> <password>   create / change an admin
//
// Env: PORT, HOST (default 127.0.0.1), DATA_DIR (default ./data), SITE_URL (where bundled photos live),
//      COOKIE_SECURE=1 when served over https (recommended in production).
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 4810);
const HOST = process.env.HOST || "127.0.0.1"; // behind Cloudflare Tunnel: localhost only
const DATA = path.resolve(process.env.DATA_DIR || path.join(HERE, "data"));
const UPLOADS = path.join(DATA, "uploads");
const BACKUPS = path.join(DATA, "backups");
const CONTENT_FILE = path.join(DATA, "content.json");
const USERS_FILE = path.join(DATA, "users.json");
const SEED_FILE = path.join(HERE, "seed-content.json");
// Built website (vite build with VITE_BASE=/ VITE_API_URL=same-origin). If present, the server
// hosts the whole site: / = website, /admin = panel, /api = data. Otherwise only panel + API.
const SITE_DIR = path.resolve(process.env.SITE_DIR || path.join(HERE, "site"));
const HAS_SITE = fs.existsSync(path.join(SITE_DIR, "index.html"));
const SITE_URL = (process.env.SITE_URL || (HAS_SITE ? "/" : "https://averysultan3-creator.github.io/s-klima/")).replace(/\/?$/, "/");
const COOKIE_SECURE = process.env.COOKIE_SECURE === "1";
const CATEGORIES = ["wewnatrz", "zewnatrz", "bruzdowanie"];
const MAX_UPLOAD = 12 * 1024 * 1024;
const SESSION_HOURS = 24 * 7;

for (const d of [DATA, UPLOADS, BACKUPS]) fs.mkdirSync(d, { recursive: true });

// ---------- storage ----------
const readJson = (f, fallback) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return fallback;
  }
};
async function writeJsonAtomic(file, data) {
  const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(data, null, 1), "utf8");
  await fsp.rename(tmp, file);
}

if (!fs.existsSync(CONTENT_FILE)) {
  fs.copyFileSync(SEED_FILE, CONTENT_FILE);
  console.log("content.json created from", SEED_FILE);
}
const validContent = (c) => c && c.photos && c.cennik && Array.isArray(c.cennik.sections);
let content = readJson(CONTENT_FILE, null);
if (!validContent(content)) {
  // damaged file (e.g. power loss) -> newest good backup, never a dead site
  const backups = fs.readdirSync(BACKUPS).filter((f) => f.startsWith("content-")).sort().reverse();
  content = backups.map((f) => readJson(path.join(BACKUPS, f), null)).find(validContent) || readJson(SEED_FILE, null);
  console.error(`content.json unreadable - restored from ${validContent(content) ? "backup/seed" : "nothing"}`);
  if (!validContent(content)) throw new Error(`Cannot read ${CONTENT_FILE}`);
  fs.renameSync(CONTENT_FILE, path.join(BACKUPS, `damaged-${Date.now()}.json`));
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 1), "utf8");
}

let saving = Promise.resolve();
function saveContent(next) {
  next.updatedAt = new Date().toISOString();
  content = next;
  saving = saving.catch(() => {}).then(async () => {
    const stamp = next.updatedAt.replace(/[:.]/g, "-");
    await writeJsonAtomic(path.join(BACKUPS, `content-${stamp}.json`), next);
    const old = (await fsp.readdir(BACKUPS)).filter((f) => f.startsWith("content-")).sort();
    for (const f of old.slice(0, Math.max(0, old.length - 50))) await fsp.unlink(path.join(BACKUPS, f)).catch(() => {});
    await writeJsonAtomic(CONTENT_FILE, next);
  });
  return saving;
}

// ---------- passwords & sessions ----------
const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) =>
  `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;
function checkPassword(password, stored) {
  if (!stored) return false;
  const [salt, hash] = stored.split(":");
  const test = crypto.scryptSync(password, salt, 64);
  const want = Buffer.from(hash, "hex");
  return want.length === test.length && crypto.timingSafeEqual(want, test);
}

if (process.argv[2] === "--set-password") {
  const [login, password] = process.argv.slice(3);
  if (!login || !password || password.length < 8) {
    console.error("Usage: node server.mjs --set-password <login> <password (min 8 chars)>");
    process.exit(1);
  }
  const users = readJson(USERS_FILE, {});
  users[login] = hashPassword(password);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 1));
  console.log(`Password set for "${login}".`);
  process.exit(0);
}

// Sessions survive restarts: only sha256(token) is stored on disk, never the token itself.
const SESSIONS_FILE = path.join(DATA, "sessions.json");
const tokenHash = (t) => crypto.createHash("sha256").update(t).digest("hex");
const sessions = new Map(Object.entries(readJson(SESSIONS_FILE, {})).filter(([, s]) => s && s.expires > Date.now()));
let sessionsTimer = null;
function persistSessions() {
  clearTimeout(sessionsTimer);
  sessionsTimer = setTimeout(() => {
    for (const [k, v] of sessions) if (v.expires < Date.now()) sessions.delete(k);
    writeJsonAtomic(SESSIONS_FILE, Object.fromEntries(sessions)).catch((e) => console.error("sessions save", e));
  }, 200);
}
const attempts = new Map(); // ip -> { count, until }

function getSession(req) {
  const m = /(?:^|;\s*)zz_admin=([a-f0-9]{64})/.exec(req.headers.cookie || "");
  if (!m) return null;
  const key = tokenHash(m[1]);
  const s = sessions.get(key);
  if (!s || s.expires < Date.now()) {
    if (sessions.delete(key)) persistSessions();
    return null;
  }
  return { token: key, ...s };
}
const cookie = (value, maxAge) =>
  `zz_admin=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${COOKIE_SECURE ? "; Secure" : ""}`;

// ---------- helpers ----------
function send(res, status, body, headers = {}) {
  const isBuf = Buffer.isBuffer(body);
  const data = isBuf || typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": isBuf ? "application/octet-stream" : typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(data);
}
function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(Object.assign(new Error("too large"), { status: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}
const readJsonBody = async (req) => {
  try {
    return JSON.parse((await readBody(req, 512 * 1024)).toString("utf8"));
  } catch (e) {
    throw Object.assign(new Error("bad json"), { status: e.status || 400 });
  }
};
function imageType(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.slice(0, 4).toString() === "RIFF" && buf.slice(8, 12).toString() === "WEBP") return "webp";
  return null;
}
const str = (v, max) => String(v ?? "").trim().slice(0, max);

function cleanCennik(input) {
  if (!input || !Array.isArray(input.sections)) throw Object.assign(new Error("bad cennik"), { status: 400 });
  return {
    sections: input.sections.slice(0, 20).map((s, i) => ({
      id: str(s.id, 40).replace(/[^a-z0-9-]/gi, "") || `sekcja-${i + 1}`,
      title: str(s.title, 120),
      subtitle: str(s.subtitle, 240),
      items: (Array.isArray(s.items) ? s.items : [])
        .slice(0, 60)
        .map((it) => ({ name: str(it.name, 160), price: str(it.price, 60), note: str(it.note, 200) }))
        .filter((it) => it.name || it.price),
    })),
  };
}

function cleanPhotos(input) {
  const out = {};
  const known = new Map(CATEGORIES.flatMap((c) => (content.photos[c] || []).map((p) => [p.id, p])));
  const seen = new Set();
  for (const c of CATEGORIES) {
    out[c] = (Array.isArray(input?.[c]) ? input[c] : [])
      .map((p) => known.get(p?.id))
      .filter((p) => p && !seen.has(p.id) && seen.add(p.id));
  }
  return out;
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".gif": "image/gif", ".ico": "image/x-icon",
  ".pdf": "application/pdf", ".woff2": "font/woff2", ".woff": "font/woff", ".webmanifest": "application/manifest+json",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg", ".txt", ".xml", ".webmanifest"]);
const gzCache = new Map(); // file -> { mtime, buf }

// ---------- static website ----------
async function serveStatic(req, res, p) {
  let rel;
  try { rel = decodeURIComponent(p); } catch { return send(res, 400, "Bad request"); }
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.resolve(SITE_DIR, "." + path.posix.normalize("/" + rel));
  if (!file.startsWith(SITE_DIR + path.sep)) return send(res, 404, "Not found");
  let st = await fsp.stat(file).catch(() => null);
  if (st && st.isDirectory()) return redirect(res, p + "/");
  if (!st) {
    const nf = path.join(SITE_DIR, "404.html");
    const body = fs.existsSync(nf) ? await fsp.readFile(nf) : "Not found";
    return send(res, 404, body, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" });
  }
  const ext = path.extname(file).toLowerCase();
  const headers = {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    // hashed build files never change; html must always be fresh; the rest: 1 day
    "Cache-Control": rel.startsWith("/assets/") ? "public, max-age=31536000, immutable" : ext === ".html" ? "no-cache" : "public, max-age=86400",
    "Last-Modified": st.mtime.toUTCString(),
  };
  if (req.headers["if-modified-since"] && new Date(req.headers["if-modified-since"]) >= new Date(st.mtime.toUTCString())) {
    res.writeHead(304, headers);
    return res.end();
  }
  if (COMPRESSIBLE.has(ext) && /gzip/.test(req.headers["accept-encoding"] || "")) {
    let c = gzCache.get(file);
    if (!c || c.mtime !== st.mtimeMs) {
      c = { mtime: st.mtimeMs, buf: zlib.gzipSync(await fsp.readFile(file), { level: 9 }) };
      gzCache.set(file, c);
    }
    res.writeHead(200, { ...headers, "Content-Encoding": "gzip", "Vary": "Accept-Encoding", "Content-Length": c.buf.length });
    return res.end(req.method === "HEAD" ? undefined : c.buf);
  }
  res.writeHead(200, { ...headers, "Content-Length": st.size });
  if (req.method === "HEAD") return res.end();
  fs.createReadStream(file).on("error", () => res.destroy()).pipe(res);
}
function redirect(res, to) {
  res.writeHead(301, { Location: to });
  res.end();
}

// ---------- routes ----------
async function handle(req, res) {
  const url = new URL(req.url, "http://x");
  const p = url.pathname;
  const ip = (req.headers["cf-connecting-ip"] || req.socket.remoteAddress || "").toString().split(",")[0].trim();

  // Public content for the website
  if (p === "/api/content" && req.method === "GET") {
    return send(res, 200, content, { "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache" });
  }
  if (p === "/api/content" && req.method === "OPTIONS") {
    return send(res, 204, "", { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" });
  }

  // Uploaded photos
  if (p.startsWith("/uploads/") && req.method === "GET") {
    const name = path.basename(p);
    if (!/^[a-z0-9-]+\.(jpg|png|webp)$/.test(name)) return send(res, 404, "Not found");
    const file = path.join(UPLOADS, name);
    if (!fs.existsSync(file)) return send(res, 404, "Not found");
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(name)],
      "Cache-Control": "public, max-age=31536000, immutable",
      "Access-Control-Allow-Origin": "*",
    });
    return fs.createReadStream(file).pipe(res);
  }

  // Health check for monitoring / pm2 / Cloudflare
  if (p === "/healthz") {
    return send(res, 200, { ok: true, site: HAS_SITE, uptime: Math.round(process.uptime()), photos: CATEGORIES.reduce((n, c) => n + content.photos[c].length, 0) }, { "Cache-Control": "no-store" });
  }

  // Admin panel page
  if (p === "/admin") return redirect(res, "/admin/");
  if (((!HAS_SITE && p === "/") || p === "/admin/") && req.method === "GET") {
    const html = (await fsp.readFile(path.join(HERE, "admin.html"), "utf8")).replaceAll("__SITE_URL__", SITE_URL);
    return send(res, 200, html, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "same-origin",
    });
  }

  // ---- auth ----
  if (p === "/api/login" && req.method === "POST") {
    const a = attempts.get(ip);
    if (a && a.count >= 8 && a.until > Date.now()) return send(res, 429, { error: "Za dużo prób. Spróbuj za 15 minut." });
    const { login, password } = await readJsonBody(req);
    const users = readJson(USERS_FILE, {});
    if (typeof login !== "string" || typeof password !== "string" || !checkPassword(password, users[login])) {
      const cur = a && a.until > Date.now() ? a : { count: 0, until: Date.now() + 15 * 60 * 1000 };
      cur.count++;
      attempts.set(ip, cur);
      await new Promise((r) => setTimeout(r, 600));
      return send(res, 401, { error: "Nieprawidłowy login lub hasło." });
    }
    attempts.delete(ip);
    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(tokenHash(token), { login, expires: Date.now() + SESSION_HOURS * 3600 * 1000 });
    persistSessions();
    return send(res, 200, { ok: true, login }, { "Set-Cookie": cookie(token, SESSION_HOURS * 3600) });
  }

  if (!p.startsWith("/api/")) {
    if (HAS_SITE && (req.method === "GET" || req.method === "HEAD")) return serveStatic(req, res, p);
    return send(res, 404, "Not found");
  }

  const session = getSession(req);
  if (p === "/api/me" && req.method === "GET") return send(res, 200, { login: session?.login || null });
  if (!session) return send(res, 401, { error: "Zaloguj się ponownie." });

  // Admin writes: same-origin only (cookie is SameSite=Strict, this is an extra guard)
  if (req.method !== "GET") {
    const origin = req.headers.origin;
    if (origin && new URL(origin).host !== req.headers.host) return send(res, 403, { error: "Forbidden" });
  }

  if (p === "/api/logout" && req.method === "POST") {
    sessions.delete(session.token);
    persistSessions();
    return send(res, 200, { ok: true }, { "Set-Cookie": cookie("", 0) });
  }

  if (p === "/api/admin/password" && req.method === "POST") {
    const { current, next } = await readJsonBody(req);
    const users = readJson(USERS_FILE, {});
    if (!checkPassword(String(current || ""), users[session.login])) return send(res, 400, { error: "Obecne hasło jest nieprawidłowe." });
    if (typeof next !== "string" || next.length < 8) return send(res, 400, { error: "Nowe hasło musi mieć min. 8 znaków." });
    users[session.login] = hashPassword(next);
    await writeJsonAtomic(USERS_FILE, users);
    for (const [t, s] of sessions) if (s.login === session.login && t !== session.token) sessions.delete(t);
    persistSessions();
    return send(res, 200, { ok: true });
  }

  if (p === "/api/admin/cennik" && req.method === "PUT") {
    const cennik = cleanCennik(await readJsonBody(req));
    await saveContent({ ...content, cennik });
    return send(res, 200, content);
  }

  if (p === "/api/admin/photos" && req.method === "PUT") {
    const before = new Set(CATEGORIES.flatMap((c) => content.photos[c].map((x) => x.id)));
    const photos = cleanPhotos(await readJsonBody(req));
    const after = new Set(CATEGORIES.flatMap((c) => photos[c].map((x) => x.id)));
    const removed = CATEGORIES.flatMap((c) => content.photos[c]).filter((x) => before.has(x.id) && !after.has(x.id));
    await saveContent({ ...content, photos });
    for (const r of removed) {
      if (r.src.startsWith("/uploads/")) {
        // keep the file in backups so a mistake can be undone by hand
        const from = path.join(UPLOADS, path.basename(r.src));
        await fsp.rename(from, path.join(BACKUPS, path.basename(r.src))).catch(() => {});
      }
    }
    return send(res, 200, content);
  }

  const up = /^\/api\/admin\/photos\/([a-z]+)$/.exec(p);
  if (up && req.method === "POST") {
    const cat = up[1];
    if (!CATEGORIES.includes(cat)) return send(res, 400, { error: "Nieznana kategoria." });
    const buf = await readBody(req, MAX_UPLOAD);
    const ext = imageType(buf);
    if (!ext) return send(res, 400, { error: "To nie jest zdjęcie (JPG/PNG/WEBP)." });
    const id = `${Date.now().toString(36)}-${crypto.randomBytes(4).toString("hex")}`;
    await fsp.writeFile(path.join(UPLOADS, `${id}.${ext}`), buf);
    const photo = { id, src: `/uploads/${id}.${ext}` };
    const photos = { ...content.photos, [cat]: [photo, ...content.photos[cat]] };
    await saveContent({ ...content, photos });
    return send(res, 200, content);
  }

  return send(res, 404, { error: "Not found" });
}

http
  .createServer((req, res) => {
    handle(req, res).catch((e) => {
      if (!res.headersSent) send(res, e.status || 500, { error: e.status ? e.message : "Błąd serwera." });
      if (!e.status) console.error(e);
    });
  })
  .listen(PORT, HOST, () => console.log(`Zielony Zając on http://${HOST}:${PORT}  site: ${HAS_SITE ? SITE_DIR : "-"}  data: ${DATA}`));

// Request errors are caught per request above; anything truly unexpected -> clean exit, pm2 restarts it.
process.on("unhandledRejection", (e) => console.error("unhandledRejection", e));
process.on("uncaughtException", (e) => { console.error("uncaughtException", e); process.exit(1); }); // pm2 restarts in <1 s
