import { writeFile } from "node:fs/promises";
import { seedContent } from "../src/lib/content";
import { href, typePath } from "../src/lib/i18n";
import type { Locale } from "../src/lib/types";
const base = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
const main = [
  "",
  "hakkimizda",
  "hizmetler",
  "kenya-rehberi",
  "sektorler",
  "blog",
  "sikca-sorulan-sorular",
  "ihracata-hazirlik",
  "kenya-ticaret-rehberi",
  "kenyadan-turkiyeye-ticaret",
  "gizlilik-politikasi",
  "cerez-politikasi",
  "kisisel-verilerin-korunmasi",
];
const paths = Array.from(
  new Set([
    ...(["tr", "en"] as Locale[]).flatMap((locale) =>
      main.map((p) => href(locale, p)),
    ),
    ...seedContent
      .filter((c) => c.status === "published")
      .map((c) => href(c.locale, `${typePath[c.type]}/${c.slug}`)),
  ]),
);
const failures: string[] = [];
const titles = new Set<string>();
let checked = 0;
const links = new Set<string>();
while (paths.length) {
  const batch = paths.splice(0, 4);
  await Promise.all(
    batch.map(async (p) => {
      const r = await fetch(base + p);
      const html = await r.text();
      if (r.status !== 200) failures.push(`${p}: ${r.status}`);
      for (const match of html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)) {
        if (new URL(match[1].replaceAll("&amp;", "&")).pathname !== "/254114601485")
          failures.push(`${p}: incorrect WhatsApp recipient`);
      }
      if (/href="(?:\/en)?\/iletisim(?:[?\"])/.test(html))
        failures.push(`${p}: contact link does not go directly to WhatsApp`);
      const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      if (!title) failures.push(`${p}: no title`);
      else if (titles.has(title)) failures.push(`${p}: duplicate title`);
      else titles.add(title);
      if ((html.match(/<h1[ >]/g) || []).length !== 1)
        failures.push(`${p}: H1 count`);
      if (!html.includes('rel="canonical"'))
        failures.push(`${p}: missing canonical`);
      if ((html.match(/hrefLang=/g) || []).length < 3)
        failures.push(`${p}: hreflang`);
      if (!html.includes(`lang="${p.startsWith("/en") ? "en" : "tr"}"`))
        failures.push(`${p}: HTML language`);
      const schema = html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )?.[1];
      try {
        if (!schema || !JSON.parse(schema)["@graph"])
          failures.push(`${p}: schema`);
      } catch {
        failures.push(`${p}: invalid JSON-LD`);
      }
      for (const match of html.matchAll(/<a\s[^>]*href="([^"#?]+)[^"]*"/g)) {
        const v = match[1];
        if (v.startsWith("/") && !v.startsWith("/api/")) links.add(v);
      }
      checked++;
    }),
  );
}
const contactRedirects = [
  ["/iletisim", ""],
  ["/en/iletisim", ""],
  ["/iletisim?service=" + encodeURIComponent("Pazar Araştırması"), "Pazar Araştırması"],
  ["/en/iletisim?service=" + encodeURIComponent("Market Research"), "Market Research"],
];
for (const [path, service] of contactRedirects) {
  const response = await fetch(base + path, { redirect: "manual" });
  const location = response.headers.get("location");
  if (response.status !== 307 || !location) {
    failures.push(`${path}: expected WhatsApp redirect, got ${response.status}`);
    continue;
  }
  const target = new URL(location);
  if (target.origin !== "https://wa.me" || target.pathname !== "/254114601485")
    failures.push(`${path}: incorrect WhatsApp redirect recipient`);
  if (service && !target.searchParams.get("text")?.includes(service))
    failures.push(`${path}: service missing from WhatsApp draft`);
}
for (const p of links) {
  const r = await fetch(base + p, { redirect: "manual" });
  if (r.status >= 400) failures.push(`broken link ${p}: ${r.status}`);
}
for (const c of seedContent.filter((c) => c.status === "draft")) {
  const p = href(c.locale, `${typePath[c.type]}/${c.slug}`);
  const r = await fetch(base + p);
  if (r.status !== 404) failures.push(`draft exposed: ${p} ${r.status}`);
}
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
for (const c of seedContent.filter((c) => c.status === "draft"))
  if (sitemap.includes(c.slug)) failures.push("draft in sitemap " + c.id);
for (const p of ["/not-a-real-page", "/admin/unknown"])
  if ((await fetch(base + p)).status !== 404)
    failures.push("404 handling " + p);
const result = {
  date: new Date().toISOString(),
  pages: checked,
  internalLinks: links.size,
  contactRedirects: contactRedirects.length,
  draftChecks: seedContent.filter((c) => c.status === "draft").length,
  failures,
};
await writeFile(
  "docs/page-check-results.json",
  JSON.stringify(result, null, 2),
);
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
