import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export type Category = "campo" | "futsal" | "society";

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategorySelect: (category: Category) => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "campo", label: "CAMPO" },
  { value: "futsal", label: "FUTSAL" },
  { value: "society", label: "SOCIETY" },
];

export const CategoryFilter = ({ selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg ring-1 ring-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Filtrar por Categoria
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => onCategorySelect(category.value)}
            className="min-w-[80px] font-medium transition-all duration-200 hover:scale-105"
          >
            {category.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Categoria selecionada:</span>
        <Badge variant="secondary">
          {CATEGORIES.find(c => c.value === selectedCategory)?.label}
        </Badge>
      </div>
    </div>
  );
};
