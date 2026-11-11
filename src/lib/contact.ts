import { local } from "./i18n";
import type { Locale } from "./types";

export const WHATSAPP_NUMBER = "254114601485";
export const WHATSAPP_DISPLAY_NUMBER = "+254 114 601 485";

export function whatsappHref(
  locale: Locale,
  service?: string,
  number = WHATSAPP_NUMBER,
) {
  const digits = number.replace(/\D/g, "") || WHATSAPP_NUMBER;
  const message = service
    ? local(
        locale,
        `Merhaba, ${service} hakkında bilgi almak ve ücretsiz ön görüşme yapmak istiyorum.`,
        `Hello, I would like information and a free introductory conversation about ${service}.`,
      )
    : local(
        locale,
        "Merhaba, Kenya danışmanlık hizmetleriniz hakkında ücretsiz ön görüşme yapmak istiyorum.",
        "Hello, I would like a free introductory conversation about your Kenya consulting services.",
      );
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
