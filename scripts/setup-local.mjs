import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
let existing = "";
try {
  existing = await readFile(".env.local", "utf8");
} catch {}
if (existing) {
  console.log(".env.local mevcut; değiştirilmedi.");
  process.exit(0);
}
const env = await readFile(".env.example", "utf8");
await writeFile(
  ".env.local",
  env
    .replace(
      "SESSION_SECRET=",
      "SESSION_SECRET=" + randomBytes(48).toString("hex"),
    )
    .replace(
      "RATE_LIMIT_SECRET=",
      "RATE_LIMIT_SECRET=" + randomBytes(32).toString("hex"),
    ),
  { mode: 0o600 },
);
console.log("Yerel ortam dosyası ve rastgele oturum sırları hazır.");
