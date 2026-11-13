const maradonaVideoUrl = "/dry-premium-city-farm-maradona.mp4";
const americaSnowVideoUrl = "/dry-premium-city-farm-america-snow.mp4";
const tropicanaCherryVideoUrl = "/DF670CF8-B23B-4767-84EC-F87C4A054B37.mp4";
const logoUrl = "/logo.jpg";

export const SITE = {
  brandName: "H4SH BOMB",
  logoUrl: logoUrl,
  telegramUrl: "https://t.me/zio_biod001",
  telegramReviewsUrl: "https://t.me/+uKGY2NmftZY4YzVk",
  instagramUrl: "https://www.instagram.com/h4sh_bomb0.1/",
  backupUrl: "",
  privacyUrl: "",
  termsUrl: "",
  timeZone: "Etc/GMT-1",
  timeZoneLabel: "UTC+1",
  openingTime: "11:30",
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
  id: "🍫";
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

const TIERS_B: PriceTier[] = [
  { weight: "1 g", price: 15 },
  { weight: "5 g", price: 65 },
  { weight: "50 g", price: 800 },
];

const TIERS_C: PriceTier[] = [
  { weight: "1 g", price: 17 },
  { weight: "5 g", price: 65 },
  { weight: "50 g", price: 800 },
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
      {
        id: "america-snow",
        name: "🇺🇸AMERICA SNOW🇺🇸",
        video: americaSnowVideoUrl,
        tags: ["new"],
        publishedAt: "2026-11-12",
        tiers: TIERS_B,
      },
      {
        id: "tropicana-cherry",
        name: "🍒TROPICANA CHERRY🍒",
        video: tropicanaCherryVideoUrl,
        tags: ["new"],
        publishedAt: "2026-11-13",
        tiers: TIERS_C,
      },
    ],
  },
];

export const getCategory = (id: Category["id"]) => CATEGORIES.find((c) => c.id === id)!;