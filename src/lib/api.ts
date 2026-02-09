/**
 * Cloudflare Worker API Client
 * Catálogo público (sem token)
 */

const API_BASE_URL = "https://misty-truth-b505.chutecerto14x.workers.dev";

export type Category = "campo" | "futsal" | "society";

export interface Product {
  id: string;
  name: string;
  category?: Category;
  sizes: string[];
  image_url: string;
}

type WorkerItem = {
  id: string | number;
  name?: string;
  nome?: string;
  category?: string;
  sizes?: string[] | string;
  tamanho?: string;
  image_url?: string;
  imageUrl?: string;
};

interface ApiResponse {
  items: WorkerItem[];
}

function normalizeCategory(category?: string): Category | undefined {
  const c = category?.toLowerCase().trim();
  if (c === "campo" || c === "futsal" || c === "society") return c;
  return undefined;
}

function normalizeSizes(item: WorkerItem): string[] {
  const raw = item.sizes ?? item.tamanho;

  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((s) => String(s).trim()).filter(Boolean);
  }

  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeName(item: WorkerItem): string {
  return (item.name ?? item.nome ?? "").trim();
}

function normalizeImageUrl(item: WorkerItem): string {
  const url = (item.image_url ?? item.imageUrl ?? "").trim();
  return url;
}

/**
 * Busca produtos da API do Worker
 * @param category - Categoria opcional para filtrar
 */
export async function fetchProducts(category?: Category | null): Promise<Product[]> {
  const url = category
    ? `${API_BASE_URL}/api/products?category=${category.toUpperCase()}`
    : `${API_BASE_URL}/api/products`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    credentials: "omit",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erro ao carregar catálogo: ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;

  const products: Product[] = (data.items || []).map((item) => ({
    id: String(item.id),
    name: normalizeName(item),
    category: normalizeCategory(item.category),
    sizes: normalizeSizes(item),
    image_url: normalizeImageUrl(item),
  }));

  if (import.meta.env.DEV) {
    console.log(
      "[CATALOGO] image_url por produto:",
      products.map((p) => ({ id: p.id, name: p.name, image_url: p.image_url }))
    );
  }

  return products;
}
