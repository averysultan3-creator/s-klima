// Builds both copies of the website:
//   server/site  -> hosted by our server (own domain, base "/", data from the same server)
//   dist         -> GitHub Pages mirror (base "/s-klima/", data from our server over https)
// Usage: node scripts/build.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Public address of our server (Cloudflare Tunnel). Change here + rebuild if the domain changes.
const PUBLIC_API = "https://zielonyzajac.clackdance.pl";

function build(outDir, env) {
  console.log(`\n== ${outDir}  ${JSON.stringify(env)}`);
  execSync(`npx vite build --outDir "${outDir}" --emptyOutDir`, { cwd: ROOT, stdio: "inherit", env: { ...process.env, ...env } });
  // hash routing: unknown paths fall back to the app
  fs.copyFileSync(path.join(ROOT, outDir, "index.html"), path.join(ROOT, outDir, "404.html"));
}

build("server/site", { VITE_BASE: "/", VITE_API_URL: "same-origin" });
build("dist", { VITE_BASE: "/s-klima/", VITE_API_URL: PUBLIC_API });
console.log("\nOK: server/site + dist");
