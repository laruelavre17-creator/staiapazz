import { SITE } from "@/config/site";

export function buildTelegramLink(
  productName: string,
  weight?: string,
  productUrl?: string,
): string {
  const formattedName = productName.trim();
  const productLabel = weight ? `${formattedName} (${weight})` : formattedName;
  const productLine = productUrl ? `Link prodotto: ${productUrl}` : "";
  const message = [
    `Ciao, vorrei informazioni su ${productLabel}.`,
    productLine,
  ]
    .filter(Boolean)
    .join("\n");

  return `${SITE.telegramUrl}?text=${encodeURIComponent(message)}`;
}
