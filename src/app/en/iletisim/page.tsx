import { redirect } from "next/navigation";
import { whatsappHref } from "@/lib/contact";
import { generateMetadata as siteMetadata } from "../../[[...path]]/page";

// Contact reads search parameters and must not inherit the catch-all's ISR mode.
export const dynamic = "force-dynamic";

const contactParams = () => Promise.resolve({ path: ["en", "iletisim"] });

export function generateMetadata() {
  return siteMetadata({ params: contactParams() });
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  redirect(whatsappHref("en", typeof query.service === "string" ? query.service : undefined));
}
