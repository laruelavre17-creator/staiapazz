<<<<<<< HEAD
const maradonaVideoUrl = "/dry-premium-city-farm-maradona.mp4";
=======
const mousseVideoUrl = "/mousse.mp4";
const ferrariVideoUrl = "/ferrari.mp4";
const lamborghiniVideoUrl = "/lamborghini.mp4";
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
const logoUrl = "/logo.jpg";

export const SITE = {
  brandName: "H4SH BOMB",
  logoUrl: logoUrl,
<<<<<<< HEAD
  telegramUrl: "https://t.me/@zioblod01",
=======
  telegramUrl: "https://t.me/H4SHBOMB",
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
  reviewsUrl: "https://t.me/+kMGEzX7AEApjYTI0",
  instagramUrl: "",
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
<<<<<<< HEAD
  id: "hsh";
=======
  id: "🍫";
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
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

<<<<<<< HEAD
=======
const TIERS_MOUSSE: PriceTier[] = [
  { weight: "50 g", price: 150 },
  { weight: "100 g", price: 250 },
  { weight: "500 g", price: 1400 },
  { weight: "1 kg", price: 2200 },
];

>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
export const CATEGORIES: Category[] = [
  {
    id: "hsh",
    name: "🍫",
    description: "Prodotti impeccabili, selezionati con cura personalmente.",
    accent: "gold",
    products: [
      {
<<<<<<< HEAD
        id: "dry-premium-city-farm-maradona",
        name: "DRY PREMIUM CITY FARM MARADONA",
        video: maradonaVideoUrl,
        tiers: TIERS_A,
      },
=======
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
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
    ],
  },
];

<<<<<<< HEAD
export const getCategory = (id: Category["id"]) => CATEGORIES.find((c) => c.id === id)!;
=======
export const getCategory = (id: "hash") => CATEGORIES.find((c) => c.id === id)!;
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
