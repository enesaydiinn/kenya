import { createInterface } from "node:readline/promises";
import { spawnSync } from "node:child_process";
const rl = createInterface({ input: process.stdin, output: process.stdout });
const email = await rl.question("Yönetici e-postası: ");
rl.close();
process.stdout.write("Yeni parola (en az 14 karakter; giriş gizlenir): ");
if (!process.stdin.isTTY) {
  console.error("\nBu komut etkileşimli terminal gerektirir.");
  process.exit(1);
}
process.stdin.setRawMode(true);
process.stdin.resume();
let password = "";
await new Promise((resolve) => {
  process.stdin.on("data", (chunk) => {
    for (const char of chunk.toString()) {
      if (char === "\u0003") {
        process.stdin.setRawMode(false);
        process.exit(1);
      }
      if (char === "\r" || char === "\n") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        resolve();
        return;
      }
      if (char === "\u007f") password = password.slice(0, -1);
      else password += char;
    }
  });
});
process.stdout.write("\n");
const args = ["--import", "tsx", "scripts/create-admin.ts", email];
try {
  const fs = await import("node:fs");
  if (fs.existsSync(".env.local")) args.unshift("--env-file=.env.local");
} catch {}
const result = spawnSync(process.execPath, args, {
  stdio: "inherit",
  env: { ...process.env, ADMIN_SETUP_PASSWORD: password },
});
process.exit(result.status || 0);
