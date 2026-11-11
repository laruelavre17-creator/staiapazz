import { SITE } from "@/config/site";

export function buildTelegramLink(
  productName: string,
  weight: string,
  price: number,
  productUrl?: string,
): string {
  const message = [
    `Ciao, ti contatto per ➡️ ${productName.trim()}`,
    `Taglio: ${weight}`,
    `Prezzo: €${price}`,
  ].join("\n");

  return `${SITE.telegramUrl}?text=${encodeURIComponent(message)}`;
}