// pm2 config: site + admin panel + API in ONE process.
//   pm2 start ecosystem.config.cjs && pm2 save
// Data (prices, uploaded photos, passwords, backups) lives OUTSIDE the repo, so git pull never touches it.
const path = require("path");

module.exports = {
  apps: [
    {
      name: "zielony-zajac",
      script: "server.mjs",
      cwd: __dirname,
      env: {
        PORT: "4810",
        HOST: "127.0.0.1",
        COOKIE_SECURE: "1",
        DATA_DIR: process.env.ZZ_DATA_DIR || path.resolve(__dirname, "..", "..", "zielony-zajac-data"),
      },
      autorestart: true,
      max_restarts: 1000,
      min_uptime: "10s",
      restart_delay: 1000,
      exp_backoff_restart_delay: 200,
      max_memory_restart: "300M",
      time: true,
    },
  ],
};
