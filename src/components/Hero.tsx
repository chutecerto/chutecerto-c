import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-soccer.jpg";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open("https://wa.me/5582999548018?text=Ol%C3%A1%2C%20quero%20ver%20os%20modelos%20de%20chuteira%20dispon%C3%ADveis", "_blank", "noopener,noreferrer");
  };

  const handleCatalog = () => {
    navigate("/catalogo");
  };

  const handleScrollDown = () => {
    const productsSection = document.getElementById("produtos");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInstagram = () => {
    window.open("https://instagram.com/chutecerto.arapiraca", "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-85"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-hero text-white mb-6">
          <span className="block">CHUTE</span>
          <span className="block text-white">CERTO</span>
        </h1>
        
        <p className="text-subtitle text-white mb-8 max-w-2xl mx-auto">
          A MARCA QUE TODO JOGADOR DE ELITE ESCOLHE
        </p>
        
        <div className="flex flex-row flex-wrap items-center justify-center gap-3">
          <Button 
            variant="catalog" 
            onClick={handleCatalog}
            className="px-5 py-3 rounded-xl font-semibold whitespace-nowrap shadow-sm transition"
          >
            VER CATÁLOGO
          </Button>
          
          <Button 
            variant="whatsapp" 
            onClick={handleWhatsApp}
            className="px-5 py-3 rounded-xl font-semibold whitespace-nowrap shadow-sm transition"
          >
            FALE NO WHATSAPP
          </Button>
          
          <Button 
            variant="instagram" 
            onClick={handleInstagram}
            className="px-5 py-3 rounded-xl font-semibold whitespace-nowrap shadow-sm transition"
          >
            INSTAGRAM
          </Button>
        </div>
        
        <div className="mt-12 text-white text-sm opacity-80">
          <p>PERFORMANCE MÁXIMA • DESIGN INOVADOR • QUALIDADE PREMIUM</p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:scale-110 transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full p-2"
        aria-label="Scroll to products section"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </section>
  );
};