import SitePage, { generateMetadata as siteMetadata } from "../[[...path]]/page";

// Contact reads search parameters and must not inherit the catch-all's ISR mode.
export const dynamic = "force-dynamic";

const contactParams = () => Promise.resolve({ path: ["iletisim"] });

export function generateMetadata() {
  return siteMetadata({ params: contactParams() });
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <SitePage params={contactParams()} searchParams={searchParams} />;
}
