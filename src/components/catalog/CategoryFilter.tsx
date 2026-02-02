import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export type Category = "campo" | "futsal" | "society";

interface CategoryFilterProps {
  selectedCategory: Category | null;
  onCategorySelect: (category: Category | null) => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "campo", label: "CAMPO" },
  { value: "futsal", label: "FUTSAL" },
  { value: "society", label: "SOCIETY" },
];

export const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  const handleCategoryClick = (category: Category) => {
    // Toggle: se já está selecionada, desseleciona (null), senão seleciona
    onCategorySelect(selectedCategory === category ? null : category);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg ring-1 ring-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Filtrar por Categoria
        </h3>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategorySelect(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Limpar filtro
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category.value)}
            className="min-w-[80px] font-medium transition-all duration-200 hover:scale-105"
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      {selectedCategory && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Categoria selecionada:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            {CATEGORIES.find(c => c.value === selectedCategory)?.label}
            <button
              onClick={() => onCategorySelect(null)}
              className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        </div>
      )}
    </div>
  );
};
