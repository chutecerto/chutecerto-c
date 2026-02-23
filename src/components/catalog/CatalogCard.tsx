import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/lib/api";

type Chuteira = Product;

interface CatalogCardProps {
  chuteira: Chuteira;
  index: number;
}

export const CatalogCard = ({ chuteira, index }: CatalogCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleWhatsApp = () => {
    if (!selectedSize) return;

    const phoneNumber = "5582999548018";
    const message = `Olá, tenho interesse na chuteira ${chuteira.name}, tamanho ${selectedSize}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="group bg-card rounded-2xl shadow-lg ring-1 ring-border/50 hover:scale-[1.01] hover:shadow-2xl transition-all duration-200"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: "fade-in 300ms ease-out forwards",
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
            {chuteira.image_url && !imageError ? (
              <>
                {!imageLoaded && <Skeleton className="w-full h-full" />}
                <img
                  src={chuteira.image_url}
                  alt={chuteira.name}
                  className={`w-full h-full object-cover transition-opacity duration-200 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </>
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs text-muted-foreground">Imagem não disponível</p>
                </div>
              </div>
            )}
            {chuteira.category && (
              <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white shadow">
                {String(chuteira.category).toUpperCase()}
              </span>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
          <div className="relative">
            {chuteira.image_url ? (
              <img
                src={chuteira.image_url}
                alt={chuteira.name}
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            ) : (
              <div className="w-full h-64 bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Imagem não disponível</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold">{chuteira.name}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-4">
        <h3
          className="text-base md:text-lg font-semibold text-foreground truncate focus:ring-2 focus:ring-ring focus:outline-none mb-2"
          tabIndex={0}
          title={chuteira.name}
        >
          {chuteira.name}
        </h3>

        {/* Seleção de Tamanhos */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Selecione o tamanho:</p>
          <div className="flex flex-wrap gap-2">
            {chuteira.sizes.map((numero) => (
              <Button
                key={numero}
                variant={selectedSize === numero ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSize(selectedSize === numero ? null : numero)}
                className="min-w-[40px] h-8 text-xs font-medium transition-all duration-200 hover:scale-105"
              >
                {numero}
              </Button>
            ))}
          </div>
        </div>

        {/* Botão COMPRAR */}
        <Button
          onClick={handleWhatsApp}
          disabled={!selectedSize}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-2 transition-all duration-200"
        >
          {selectedSize ? "COMPRAR" : "SELECIONE UM TAMANHO"}
        </Button>
      </div>
    </div>
  );
};