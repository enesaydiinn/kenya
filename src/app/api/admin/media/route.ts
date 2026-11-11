import { randomUUID } from "node:crypto";
import { currentSession, sameOrigin } from "@/lib/auth";
import { saveMedia } from "@/lib/store";
import { json } from "@/lib/http";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  const reader = req.body?.getReader();
  if (!reader) return json({ error: "Dosya yok." }, 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 3 * 1024 * 1024) {
      await reader.cancel();
      return json({ error: "En fazla 3 MB görsel yükleyebilirsiniz." }, 413);
    }
    chunks.push(value);
  }
  const buffer = Buffer.concat(chunks);
  const hex = buffer.subarray(0, 12).toString("hex");
  const type = hex.startsWith("89504e470d0a1a0a")
    ? "image/png"
    : hex.startsWith("ffd8ff")
      ? "image/jpeg"
      : buffer.toString("ascii", 0, 4) === "RIFF" &&
          buffer.toString("ascii", 8, 12) === "WEBP"
        ? "image/webp"
        : null;
  if (!type)
    return json(
      { error: "Yalnız JPEG, PNG veya WebP görselleri kabul edilir." },
      400,
    );
  const id = randomUUID();
  await saveMedia(id, { type, data: buffer.toString("base64") });
  return json({ url: "/api/media/" + id }, 201);
}
