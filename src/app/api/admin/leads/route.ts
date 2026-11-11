import { z } from "zod";
import { currentSession, sameOrigin } from "@/lib/auth";
import { getLeads, updateLead } from "@/lib/store";
import { leadStatuses } from "@/lib/types";
import { json, safeBody } from "@/lib/http";
export async function GET() {
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  return json(await getLeads());
}
export async function PATCH(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  try {
    const v = z
      .object({ id: z.string().max(100), status: z.enum(leadStatuses) })
      .parse(await safeBody(req, 1000));
    await updateLead(v.id, { status: v.status });
    return json({ ok: true });
  } catch {
    return json({ error: "Güncelleme başarısız." }, 400);
  }
}
