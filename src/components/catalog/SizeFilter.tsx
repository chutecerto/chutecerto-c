import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface SizeFilterProps {
  selectedSize: string | null;
  onSizeSelect: (size: string | null) => void;
}

const AVAILABLE_SIZES = ["37", "38", "39", "40", "41", "42", "43", "44"];

export const SizeFilter = ({ selectedSize, onSizeSelect }: SizeFilterProps) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg ring-1 ring-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Filtrar por Numeração
        </h3>
        {selectedSize && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSizeSelect(null)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Limpar filtro
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_SIZES.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            size="sm"
            onClick={() => onSizeSelect(selectedSize === size ? null : size)}
            className="min-w-[48px] font-medium transition-all duration-200 hover:scale-105"
          >
            {size}
          </Button>
        ))}
      </div>
      
      {selectedSize && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtrando por:</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            Tamanho {selectedSize}
            <button
              onClick={() => onSizeSelect(null)}
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