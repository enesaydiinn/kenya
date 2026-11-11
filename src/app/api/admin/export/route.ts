import { currentSession } from "@/lib/auth";
import { getLeads } from "@/lib/store";
import { csvCell } from "@/lib/validation";
import { json } from "@/lib/http";
export async function GET() {
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  const keys = [
    "id",
    "name",
    "company",
    "email",
    "phone",
    "country",
    "service",
    "sector",
    "message",
    "preference",
    "status",
    "createdAt",
  ] as const;
  const rows = (await getLeads()).map((l) =>
    keys.map((k) => csvCell(l[k])).join(","),
  );
  return new Response("\uFEFF" + [keys.join(","), ...rows].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kenya-talepler.csv"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
