import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Category, type Product } from "@/lib/api";

// Re-export types para manter compatibilidade
export type { Category, Product as Chuteira };

export const useCatalog = (categoria: Category | null = null, numeroFiltro?: string) => {
  return useQuery({
    queryKey: ["chuteiras", categoria, numeroFiltro],
    queryFn: async (): Promise<Product[]> => {
      const products = await fetchProducts(categoria);

      // Aplicar filtro de numeração no frontend se especificado
      if (numeroFiltro) {
        return products.filter(product => 
          product.numeros_disponiveis.includes(numeroFiltro)
        );
      }

      return products;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1, // Evitar loops infinitos de retry
    refetchOnWindowFocus: false,
  });
};
