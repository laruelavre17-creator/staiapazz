const mousseVideoUrl = "/mousse.mp4";
const ferrariVideoUrl = "/ferrari.mp4";
const lamborghiniVideoUrl = "/lamborghini.mp4";
const logoUrl = "/logo.jpg";

export const SITE = {
  brandName: "H4SH BOMB",
  logoUrl: logoUrl,
  telegramUrl: "https://t.me/H4SHBOMB",
  reviewsUrl: "https://t.me/+kMGEzX7AEApjYTI0",
  tagline: "Qualità premium · Spedizione discreta · Prezzi imbattibili",
  year: 2026,
};

export type PriceTier = { weight: string; price: number };

export type Product = {
  id: string;
  name: string;
  video?: string;
  image?: string;
  tiers: PriceTier[];
};

export type Category = {
  id: "hash";
  name: string;
  description: string;
  accent: "gold" | "ember";
  products: Product[];
};

const TIERS_A: PriceTier[] = [
  { weight: "50 g", price: 200 },
  { weight: "100 g", price: 350 },
  { weight: "500 g", price: 1450 },
  { weight: "1 kg", price: 2800 },
];

const TIERS_MOUSSE: PriceTier[] = [
  { weight: "50 g", price: 150 },
  { weight: "100 g", price: 250 },
  { weight: "500 g", price: 1400 },
  { weight: "1 kg", price: 2200 },
];

export const CATEGORIES: Category[] = [
  {
    id: "hash",
    name: "HASH",
    description: "Prodotti impeccabili, selezionati con cura personalmente.",
    accent: "gold",
    products: [
      {
        id: "dry-premium-farm-lamborghini",
        name: "DRY PREMIUM FARM LAMBORGHINI",
        video: lamborghiniVideoUrl,
        tiers: TIERS_A,
      },
      {
        id: "dry-premium-farm-ferrari",
        name: "DRY PREMIUM FARM FERRARI",
        video: ferrariVideoUrl,
        tiers: TIERS_A,
      },
      {
        id: "mousse-2026",
        name: "MOUSSE 2026",
        video: mousseVideoUrl,
        tiers: TIERS_MOUSSE,
      },
    ],
  },
];

export const getCategory = (id: "hash") =>
  CATEGORIES.find((c) => c.id === id)!;
