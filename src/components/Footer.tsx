import { Button } from "@/components/ui/button";
export const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5582999548018?text=Ol%C3%A1%2C%20quero%20ver%20os%20modelos%20de%20chuteira%20dispon%C3%ADveis", "_blank", "noopener,noreferrer");
  };
  return <section className="bg-black py-20">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
          PRONTO PARA O
          <span className="block text-red-500">PRÓXIMO NÍVEL?</span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Junte-se aos milhares de jogadores que confiam na CHUTECERTO. 
          Entre em contato agora e descubra a diferença.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="mb-4 md:mb-0">
              <p className="text-2xl font-black text-white">CHUTECERTO</p>
              <p className="text-sm">Performance que faz a diferença</p>
            </div>
            
            <div className="text-sm text-center md:text-right">
              <p>© 2025 CHUTECERTO. Todos os direitos reservados.</p>
              <p className="mt-1">Feito para vencedores 🏆</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};