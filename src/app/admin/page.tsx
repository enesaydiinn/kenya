import { currentSession } from "@/lib/auth";
import { databaseConfigured } from "@/lib/store";
import { AdminApp, AdminLogin } from "@/components/admin";
export const dynamic = "force-dynamic";
export default async function Page() {
  const session = await currentSession();
  return session ? (
    <AdminApp />
  ) : (
    <AdminLogin configured={databaseConfigured()} />
  );
}
