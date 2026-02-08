/**
 * Cloudflare Worker API Client
 * Substitui completamente o Supabase para o site oficial
 */

const API_BASE_URL = "https://misty-truth-b505.chutecerto14x.workers.dev";

export type Category = "campo" | "futsal" | "society";

export interface Product {
  id: string;
  nome: string;
  image_url: string;
  numeros_disponiveis: string[];
  category?: Category;
}

interface ApiResponse {
  items: Array<{
    id: string | number;
    nome: string;
    image_url?: string;
    tamanho?: string;
    sizes?: string[] | string;
    category?: string;
  }>;
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
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao carregar catálogo: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  if (process.env.NODE_ENV === 'development') {
    console.log('[API] Dados recebidos:', data.items?.map(p => ({ nome: p.nome, image_url: p.image_url })));
  }

  return (data.items || []).map((item) => {
    // Normalizar sizes - pode vir como string ou array
    let sizes: string[] = [];
    if (item.sizes) {
      if (Array.isArray(item.sizes)) {
        sizes = item.sizes.map(s => String(s).trim());
      } else if (typeof item.sizes === 'string') {
        sizes = item.sizes.split(',').map(s => s.trim());
      }
    } else if (item.tamanho) {
      sizes = item.tamanho.split(',').map(s => s.trim());
    }

    return {
      id: String(item.id),
      nome: item.nome,
      image_url: item.image_url || '',
      numeros_disponiveis: sizes,
      category: item.category?.toLowerCase() as Category | undefined,
    };
  });
}
