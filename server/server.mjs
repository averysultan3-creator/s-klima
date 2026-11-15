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
const SITE_URL = (process.env.SITE_URL || "https://averysultan3-creator.github.io/s-klima/").replace(/\/?$/, "/");
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
  const tmp = `${file}.${process.pid}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(data, null, 1), "utf8");
  await fsp.rename(tmp, file);
}

if (!fs.existsSync(CONTENT_FILE)) {
  fs.copyFileSync(SEED_FILE, CONTENT_FILE);
  console.log("content.json created from", SEED_FILE);
}
let content = readJson(CONTENT_FILE, null);
if (!content) throw new Error(`Cannot read ${CONTENT_FILE}`);

let saving = Promise.resolve();
function saveContent(next) {
  next.updatedAt = new Date().toISOString();
  content = next;
  saving = saving.then(async () => {
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

const sessions = new Map(); // token -> { login, expires }
const attempts = new Map(); // ip -> { count, until }

function getSession(req) {
  const m = /(?:^|;\s*)zz_admin=([a-f0-9]{64})/.exec(req.headers.cookie || "");
  if (!m) return null;
  const s = sessions.get(m[1]);
  if (!s || s.expires < Date.now()) {
    sessions.delete(m[1]);
    return null;
  }
  return { token: m[1], ...s };
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

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

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

  // Admin panel page
  if ((p === "/" || p === "/admin" || p === "/admin/") && req.method === "GET") {
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
    sessions.set(token, { login, expires: Date.now() + SESSION_HOURS * 3600 * 1000 });
    return send(res, 200, { ok: true, login }, { "Set-Cookie": cookie(token, SESSION_HOURS * 3600) });
  }

  if (!p.startsWith("/api/")) return send(res, 404, "Not found");

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
  .listen(PORT, HOST, () => console.log(`Zielony Zając admin on http://${HOST}:${PORT}  (data: ${DATA})`));
