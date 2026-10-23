/** Builds a wa.me deep link with a URL-encoded prefilled message. */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const digits = whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Convenience for a service-specific CTA, e.g. "Olá! Gostaria de agendar: Corte Terapêutico". */
export function buildServiceWhatsAppUrl(
  whatsappNumber: string,
  messageTemplate: string,
  serviceName: string,
): string {
  return buildWhatsAppUrl(whatsappNumber, messageTemplate.replace("{service}", serviceName));
}
