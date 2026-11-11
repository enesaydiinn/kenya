import type { Locale } from "./types";
export const local = (locale: Locale, tr: string, en: string) =>
  locale === "tr" ? tr : en;
export const href = (locale: Locale, path = "") =>
  `${locale === "en" ? "/en" : ""}/${path}`.replace(/\/$/, "") || "/";
export const typePath = {
  service: "hizmetler",
  guide: "kenya-rehberi",
  blog: "blog",
  sector: "sektorler",
};
export const dateLabel = (value: string, locale: Locale) =>
  new Date(value).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Istanbul",
  });
