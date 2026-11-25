const maradonaVideoUrl = "/222.mp4";
const superBoofVideoUrl = "/IMG_0124.mp4";
const americaSnowVideoUrl = "/dry-premium-city-farm-america-snow.mp4";
const tropicanaCherryVideoUrl = "/DF670CF8-B23B-4767-84EC-F87C4A054B37.mp4";
const mountainGiantsVideoUrl = "/a2155f161cba47e59f55d98723939e2b.mp4";
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

// Riportato a numero, così i calcoli del frontend funzionano
export type PriceTier = { weight: string; price: number };
export type ProductTag = "new" | "featured";

export type Product = {
  id: string;
  name: string;
  description?: string; // <-- AGGIUNTO QUI PER LE INFO EXTRA
  video?: string;
  image?: string;
  tags?: ProductTag[];
  publishedAt?: string;
  tiers: PriceTier[];
};

export type CategoryId = "🍫" | "🍁";

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  accent: "gold" | "ember";
  products: Product[];
};

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

const TIERS_E: PriceTier[] = [
  { weight: "5 g", price: 25 },
  { weight: "10 g", price: 50 },
  { weight: "50 g", price: 175 },
  { weight: "100 g", price: 350 },
];

const TIERS_F: PriceTier[] = [
  { weight: "1.20 g", price: 20 },
  { weight: "5 g", price: 80 },
  { weight: "10 g", price: 160 },
  { weight: "25 g", price: 300 },
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
        name: "DRY PREMIUM CITY🏡\n✅FARM MARADONA 👨‍🔬",
        video: maradonaVideoUrl,
        tags: ["new"],
        publishedAt: "2026-11-15",
        tiers: TIERS_E,
      },
      {
        id: "nectar-boyz-super-boof",
        name: "NECTAR BOYZ\n✅SUPER BOOF✈️",
        video: superBoofVideoUrl,
        tags: ["new"],
        publishedAt: "2026-11-21",
        tiers: TIERS_F,
      },
      // --- PRODOTTO AGGIORNATO ---
      {
        id: "limited-edition-mountain-giants",
        name: "😉LIMITED EDITION MOUNTAIN GIANTS✅",
        description: "Box 10x100g · Più g in privato", // <-- INFO AGGIUNTE QUI
        video: mountainGiantsVideoUrl,
        tags: ["new"],
        publishedAt: "2026-11-25",
        tiers: [
          { weight: "1 g", price: 70 },
          { weight: "5 g", price: 350 },
          { weight: "10 g", price: 700 },
          { weight: "Box + 🗡️🗡️🗡️ + 100g WPFF", price: 3500 },
        ],
      },
    ],
  },
  {
    id: "🍁",
    name: "🍁",
    description: "Selezione esclusiva, novità selezionate con cura.",
    accent: "ember",
    products: [
      {
        id: "america-snow",
        name: "⛽AMERICA SNOW⛽",
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

export const getCategory = (id: CategoryId) => CATEGORIES.find((c) => c.id === id)!;