import SiteLayout from "../../[[...path]]/layout";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout params={Promise.resolve({ path: ["en", "iletisim"] })}>
      {children}
    </SiteLayout>
  );
}
