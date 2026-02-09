import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Category, type Product } from "@/lib/api";

// Re-export types para manter compatibilidade
export type { Category, Product as Chuteira };

export const useCatalog = (categoria: Category | null = null, numeroFiltro?: string) => {
  return useQuery({
    queryKey: ["catalogo", "products", categoria, numeroFiltro],
    queryFn: async (): Promise<Product[]> => {
      const products = await fetchProducts(categoria);

      // Aplicar filtro de numeração no frontend se especificado
      if (numeroFiltro) {
        return products.filter((product) => product.sizes.includes(numeroFiltro));
      }

      return products;
    },
    // Evitar cache antigo / estado local sobrescrevendo
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,

    // Evitar spam de requests (retry manual via botão)
    retry: false,
  });
};
