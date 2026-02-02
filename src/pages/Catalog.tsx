import { useState } from "react";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { SizeFilter } from "@/components/catalog/SizeFilter";
import { CategoryFilter, type Category } from "@/components/catalog/CategoryFilter";
import { useCatalog } from "@/hooks/useCatalog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORY_LABELS: Record<Category, string> = {
  campo: "Campo",
  futsal: "Futsal",
  society: "Society",
};

const Catalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { data: chuteiras = [], isLoading, error } = useCatalog(selectedCategory, selectedSize || undefined);
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Início
          </Button>
        </div>
        
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Catálogo de Chuteiras
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa seleção de chuteiras para todas as modalidades
          </p>
        </header>

        {/* Filtro de Categoria */}
        <div className="mb-4">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Filtro de Numeração */}
        <div className="mb-8">
          <SizeFilter 
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />
        </div>

        <main>
          {/* Contador de resultados */}
          {!isLoading && !error && (
            <div className="mb-6 text-center">
              <p className="text-muted-foreground">
                {selectedSize && selectedCategory
                  ? `${chuteiras.length} chuteira(s) de ${CATEGORY_LABELS[selectedCategory]} encontrada(s) no tamanho ${selectedSize}`
                  : selectedCategory
                    ? `${chuteiras.length} chuteira(s) de ${CATEGORY_LABELS[selectedCategory]} no catálogo`
                    : selectedSize
                      ? `${chuteiras.length} chuteira(s) encontrada(s) no tamanho ${selectedSize}`
                      : `${chuteiras.length} chuteira(s) no catálogo`
                }
              </p>
            </div>
          )}
          
          <CatalogGrid 
            chuteiras={chuteiras} 
            isLoading={isLoading} 
            error={error} 
          />
        </main>
      </div>
    </div>
  );
};

export default Catalog;