import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  CheckCircle2,
  Play,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { CATEGORIES, SITE, type Product } from "@/config/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const filters = [
  { id: "all", label: "TUTTI" },
  { id: "new", label: "NUOVI" },
  { id: "featured", label: "IN EVIDENZA" },
  { id: "extract", label: "ESTRATTO" },
  { id: "hsh", label: "🍫" },
] as const;

type FilterId = (typeof filters)[number]["id"];
type SortId = "default" | "name" | "recent";
<<<<<<< HEAD
type CatalogProduct = Product & {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
};
=======
type CatalogProduct = Product & { categoryName: string; categoryDescription: string };
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22

const products: CatalogProduct[] = CATEGORIES.flatMap((category) =>
  category.products.map((product) => ({
    ...product,
<<<<<<< HEAD
    categoryId: category.id,
=======
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
    categoryName: category.name,
    categoryDescription: category.description,
  })),
);

const getProductLink = (product: CatalogProduct, weight: string) => {
  const url = new URL(SITE.telegramUrl);
  url.searchParams.set(
    "text",
    `Ciao, vorrei informazioni su ${product.name} (${weight}). Potete confermare la disponibilità e le modalità di ritiro?`,
  );
  return url.toString();
};

function ProductMedia({ product, large = false }: { product: CatalogProduct; large?: boolean }) {
  return (
    <div className={`product-media${large ? " product-media-large" : ""}`}>
      {product.video ? (
        <video
          src={product.video}
          autoPlay
          loop
          muted
          playsInline
          controls={large}
          preload="metadata"
          aria-label={`Video del prodotto ${product.name}`}
        />
      ) : product.image ? (
        <img src={product.image} alt={product.name} loading="lazy" />
      ) : (
        <div className="product-placeholder" aria-hidden="true">
          <ShieldCheck />
        </div>
      )}
      {!large && (
        <span className="media-play-indicator" aria-hidden="true">
          <Play fill="currentColor" />
        </span>
      )}
    </div>
  );
}

export function CatalogSection() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [sort, setSort] = useState<SortId>("default");
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [selectedWeight, setSelectedWeight] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("it");
    const filtered = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.categoryName} ${product.categoryDescription}`
          .toLocaleLowerCase("it")
          .includes(normalizedQuery);
      const matchesFilter =
        filter === "all" ||
        (filter === "new" && product.tags?.includes("new")) ||
        (filter === "featured" && product.tags?.includes("featured")) ||
        (filter === "extract" && product.categoryName.toLocaleLowerCase("it") === "estratto") ||
<<<<<<< HEAD
        (filter === "hsh" && product.categoryId === "hsh");
=======
        (filter === "hash" && product.categoryName.toLocaleLowerCase("it") === "hash");
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
      return matchesQuery && matchesFilter;
    });

    if (sort === "name") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name, "it"));
    }

    if (sort === "recent") {
      return filtered.sort(
        (a, b) => Date.parse(b.publishedAt ?? "") - Date.parse(a.publishedAt ?? "") || 0,
      );
    }

    return filtered;
  }, [filter, query, sort]);

  const openProduct = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setSelectedWeight(product.tiers[0]?.weight ?? "");
  };

  return (
    <section id="catalogo" className="catalog-section page-section" aria-labelledby="catalog-title">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">
            <span /> IL MENU
          </p>
          <h2 id="catalog-title">
            MENU <span>ATTUALE</span>
          </h2>
        </div>
        <span className="catalog-count">
          <span className="status-dot status-dot-green" />
          {visibleProducts.length} NEL CATALOGO
        </span>
      </div>

      <div className="catalog-tools reveal">
        <label className="search-field">
          <Search aria-hidden="true" />
          <span className="sr-only">Cerca nel catalogo</span>
          <input
            type="search"
            placeholder="Cerca prodotto..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button type="button" className="clear-search" onClick={() => setQuery("")}>
              Cancella
            </button>
          )}
        </label>

        <div className="filter-bar" role="group" aria-label="Filtra per categoria">
          <SlidersHorizontal aria-hidden="true" />
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter-chip${filter === item.id ? " is-active" : ""}`}
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="sort-field">
          <ArrowUpDown aria-hidden="true" />
          <span>ORDINA</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortId)}>
            <option value="default">PREDEFINITO</option>
            <option value="name">A–Z</option>
            <option value="recent">RECENTI</option>
          </select>
        </label>
        {sort === "recent" && (
          <p className="recent-note">
            Le date di pubblicazione non sono presenti nei dati: è mantenuto l’ordine originale del
            catalogo.
          </p>
        )}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <article
              key={product.id}
<<<<<<< HEAD
              className="product-card"
=======
              className="product-card reveal"
>>>>>>> d0df6a05cf43fd91695c06685d845bf353481b22
              style={{ animationDelay: `${Math.min(index, 5) * 90}ms` }}
            >
              <button
                type="button"
                className="product-image-button"
                onClick={() => openProduct(product)}
                aria-label={`Apri ${product.name}`}
              >
                <ProductMedia product={product} />
                <span className="availability-badge">
                  <CheckCircle2 aria-hidden="true" /> DISPONIBILE
                </span>
              </button>
              <div className="product-card-body">
                <div className="product-category">{product.categoryName}</div>
                <h3>{product.name}</h3>
                <p>{product.categoryDescription}</p>
                <div className="product-card-bottom">
                  <span className="product-price">
                    DA <strong>€{Math.min(...product.tiers.map((tier) => tier.price))}</strong>
                  </span>
                  <button
                    type="button"
                    className="product-select"
                    onClick={() => openProduct(product)}
                  >
                    SCEGLI <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-catalog" role="status">
          <Search aria-hidden="true" />
          <h3>Nessun prodotto trovato</h3>
          <p>
            Non ci sono prodotti corrispondenti a questa ricerca o categoria nel catalogo attuale.
          </p>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Mostra tutti i prodotti
          </button>
        </div>
      )}

      <Dialog
        open={selectedProduct !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <DialogContent className="product-dialog">
            <ProductMedia product={selectedProduct} large />
            <div className="product-dialog-details">
              <DialogHeader>
                <span className="product-category">{selectedProduct.categoryName}</span>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.categoryDescription}</DialogDescription>
              </DialogHeader>

              <label className="variant-field">
                <span>Seleziona il taglio</span>
                <select
                  value={selectedWeight}
                  onChange={(event) => setSelectedWeight(event.target.value)}
                >
                  {selectedProduct.tiers.map((tier) => (
                    <option key={tier.weight} value={tier.weight}>
                      {tier.weight} — €{tier.price}
                    </option>
                  ))}
                </select>
              </label>

              <div className="modal-price-list">
                {selectedProduct.tiers.map((tier) => (
                  <button
                    type="button"
                    key={tier.weight}
                    className={selectedWeight === tier.weight ? "is-selected" : ""}
                    onClick={() => setSelectedWeight(tier.weight)}
                  >
                    <span>{tier.weight}</span>
                    <strong>€{tier.price}</strong>
                  </button>
                ))}
              </div>

              <a
                className="primary-action modal-telegram"
                href={getProductLink(selectedProduct, selectedWeight)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send aria-hidden="true" />
                CONTINUA SU TELEGRAM
              </a>
              <p className="availability-note">
                <ShieldCheck aria-hidden="true" />
                Disponibilità e modalità di ritiro da confermare con lo staff.
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <p className="catalog-note reveal">
        I prezzi e i tagli mostrati sono quelli attualmente presenti nel catalogo. Contatta lo staff
        per confermare la disponibilità.
      </p>
    </section>
  );
}
