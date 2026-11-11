import { SITE } from "@/config/site";

export function buildTelegramLink(
  productName: string,
  weight: string,
  price: number,
  productUrl?: string,
): string {
  const formattedName = productName.trim();
  const productLabel = `${formattedName} (${weight}) — €${price}`;
  const productLine = productUrl ? `Link prodotto: ${productUrl}` : "";
  const message = [
    `Ciao, vorrei informazioni su ${productLabel}.`,
    productLine,
  ]
    .filter(Boolean)
    .join("\n");

  return `${SITE.telegramUrl}?text=${encodeURIComponent(message)}`;
}
