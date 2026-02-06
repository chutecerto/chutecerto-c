import { Skeleton } from "@/components/ui/skeleton";
import { CatalogCard } from "./CatalogCard";
import type { Chuteira } from "@/hooks/useCatalog";

interface CatalogGridProps {
  chuteiras: Chuteira[];
  isLoading: boolean;
  error: Error | null;
}

export const CatalogGrid = ({ chuteiras, isLoading, error }: CatalogGridProps) => {
  // Loading state com skeleton grid
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Erro ao carregar catálogo
          </h3>
          <p className="text-muted-foreground">
            Não foi possível carregar as chuteiras. Tente novamente mais tarde.
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (chuteiras.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted/50 border border-border rounded-lg p-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma chuteira cadastrada
          </h3>
          <p className="text-muted-foreground">
            O catálogo ainda não possui produtos disponíveis.
          </p>
        </div>
      </div>
    );
  }

  // Grid with products
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
      {chuteiras.map((chuteira, index) => (
        <CatalogCard 
          key={chuteira.id} 
          chuteira={chuteira} 
          index={index}
        />
      ))}
    </div>
  );
};