const maradonaVideoUrl = "/dry-premium-city-farm-maradona.mp4";
const logoUrl = "/logo.jpg";

export const SITE = {
  brandName: "H4SH BOMB",
  logoUrl: logoUrl,
  telegramUrl: "https://t.me/zio_biod001",
  telegramReviewsUrl: "https://t.me/+17p_xWV9SL4xNTJk",
  instagramUrl: "https://www.instagram.com/h4sh_bomb0.1/",
  backupUrl: "",
  privacyUrl: "",
  termsUrl: "",
  timeZone: "Etc/GMT-1",
  timeZoneLabel: "UTC+1",
  openingTime: "17:30",
  closingTime: "00:30",
  tagline: "Qualità premium · Spedizione discreta · Prezzi imbattibili",
  year: 2026,
};

export type PriceTier = { weight: string; price: number };
export type ProductTag = "new" | "featured";

export type Product = {
  id: string;
  name: string;
  video?: string;
  image?: string;
  tags?: ProductTag[];
  publishedAt?: string;
  tiers: PriceTier[];
};

export type Category = {
  id: "hsh";
  name: string;
  description: string;
  accent: "gold" | "ember";
  products: Product[];
};

const TIERS_A: PriceTier[] = [
  { weight: "2 g", price: 10 },
  { weight: "5 g", price: 30 },
  { weight: "10 g", price: 50 },
  { weight: "100 g", price: 350 },
  { weight: "1 kg", price: 2650 },
];

export const CATEGORIES: Category[] = [
  {
    id: "🍫",
    name: "🍫",
    description: "Prodotti impeccabili, selezionati con cura personalmente.",
    accent: "gold",
    products: [
      {
        id: "dry-premium-city-farm-maradona",
        name: "DRY PREMIUM CITY FARM MARADONA",
        video: maradonaVideoUrl,
        tiers: TIERS_A,
      },
    ],
  },
];

export const getCategory = (id: Category["id"]) => CATEGORIES.find((c) => c.id === id)!;
