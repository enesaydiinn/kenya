import { spawnSync } from "node:child_process";
import { readFile, writeFile, readdir, mkdir, rm } from "node:fs/promises";
import path from "node:path";
const env = {
  ...process.env,
  SITES_BUILD: "true",
  LOCAL_DATA_ENABLED: "false",
  NEXT_PUBLIC_SITE_URL:
    process.env.SITES_ORIGIN ||
    "https://kenya-danismanlik.udemyenes.chatgpt.site",
  APP_ORIGIN:
    process.env.SITES_ORIGIN ||
    "https://kenya-danismanlik.udemyenes.chatgpt.site",
  INDEXING_ENABLED: "false",
};
const result =
  process.env.SKIP_OPENNEXT_BUILD === "true"
    ? { status: 0 }
    : spawnSync(
        "node",
        ["node_modules/@opennextjs/cloudflare/dist/cli/index.js", "build"],
        { stdio: "inherit", env },
      );
if (result.status !== 0) process.exit(result.status || 1);
await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
const assets = {};
const types = {
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};
async function collect(dir, prefix = "") {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const relative = prefix + "/" + e.name;
    if (e.isDirectory()) await collect(full, relative);
    else
      assets[relative] = {
        type: types[path.extname(e.name)] || "application/octet-stream",
        data: (await readFile(full)).toString("base64"),
      };
  }
}
await collect(".open-next/assets");
await writeFile(".open-next/embedded-assets.json", JSON.stringify(assets));
await writeFile(
  ".open-next/sites-entry.mjs",
  `import worker from './worker.js';\nimport assets from './embedded-assets.json';\nfunction assetFetch(request){const path=new URL(typeof request==='string'?request:request.url).pathname;const a=assets[path];if(!a)return new Response('Not found',{status:404});return new Response(Uint8Array.from(atob(a.data),c=>c.charCodeAt(0)),{headers:{'Content-Type':a.type,'Cache-Control':path.startsWith('/_next/')?'public, max-age=31536000, immutable':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});}\nexport default {async fetch(request,env,ctx){const p=new URL(request.url).pathname;if(assets[p])return assetFetch(request);return worker.fetch(request,{...env,ASSETS:{fetch:assetFetch},SITES_BUILD:'true',LOCAL_DATA_ENABLED:'false',APP_ORIGIN:new URL(request.url).origin},ctx);}};\n`,
);
const packed = spawnSync(
  "node",
  [
    "node_modules/wrangler/bin/wrangler.js",
    "deploy",
    "--dry-run",
    "--config",
    "wrangler.sites.jsonc",
    "--outdir",
    "dist/server",
    "--minify",
  ],
  {
    stdio: "inherit",
    env: {
      ...env,
      WRANGLER_SEND_METRICS: "false",
      XDG_CONFIG_HOME: path.resolve(".open-next/tool-state"),
      WRANGLER_LOG_PATH: path.resolve(".open-next/wrangler.log"),
    },
  },
);
if (packed.status !== 0) process.exit(packed.status || 1);
await writeFile(
  "dist/server/index.js",
  await readFile("dist/server/sites-entry.js"),
);
for (const name of ["sites-entry.js", "sites-entry.js.map", "README.md"])
  await rm(path.join("dist/server", name), { force: true });
await writeFile(
  "dist/.openai/hosting.json",
  await readFile(".openai/hosting.json"),
);
console.log("Sites Worker and embedded assets built.");
