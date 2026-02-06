import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCatalog } from "@/hooks/useCatalog";
import { Skeleton } from "@/components/ui/skeleton";
export const Products = () => {
  const navigate = useNavigate();
  const { data: chuteiras, isLoading } = useCatalog();
  
  // Limitar a 4 produtos para os destaques
  const destaques = chuteiras?.slice(0, 4) || [];

  const handleWhatsApp = (productName: string) => {
    const message = `Olá, gostaria de saber mais sobre a chuteira ${productName}`;
    window.open(`https://wa.me/5582999548018?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleViewCatalog = () => {
    navigate("/catalogo");
  };
  return <section id="produtos" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            NOSSOS <span className="text-red-500">DESTAQUES</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Cada chuteira pensada para elevar seu jogo ao próximo nível</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Mobile: Carrossel horizontal */}
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory lg:hidden mb-16">
              {destaques.map(produto => (
                <div key={produto.id} className="min-w-[220px] snap-start bg-white/90 dark:bg-zinc-900 rounded-2xl shadow p-4 group relative overflow-hidden card-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                  
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden">
                    <img src={produto.image_url || '/placeholder.svg'} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-110 transition-smooth" loading="lazy" />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-black dark:text-white mb-2 uppercase tracking-wide">
                      {produto.nome}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Tamanhos: {produto.numeros_disponiveis.join(', ') || 'Consultar'}
                    </p>
                    <Button variant="hero" onClick={() => handleWhatsApp(produto.nome)} className="w-full text-sm text-center">
                      CONFERIR
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {destaques.map(produto => (
                <div key={produto.id} className="group relative bg-white rounded-2xl overflow-hidden card-shadow hover:shadow-2xl transition-smooth hover:scale-105">
                  
                  {/* Product Image */}
                  <div className="aspect-square overflow-hidden">
                    <img src={produto.image_url || '/placeholder.svg'} alt={produto.nome} className="w-full h-full object-cover group-hover:scale-110 transition-smooth" loading="lazy" />
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black text-black mb-2 uppercase tracking-wide">
                      {produto.nome}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tamanhos: {produto.numeros_disponiveis.join(', ') || 'Consultar'}
                    </p>
                    <Button variant="hero" onClick={() => handleWhatsApp(produto.nome)} className="w-full text-sm text-center">
                      CONFERIR
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="text-center">
          <Button variant="catalog" size="lg" onClick={handleViewCatalog} className="text-cta px-12 py-4">
            VER CATÁLOGO COMPLETO
          </Button>
        </div>
      </div>
    </section>;
};