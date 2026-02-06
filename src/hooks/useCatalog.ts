import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = "campo" | "futsal" | "society";

export interface Chuteira {
  id: string;
  nome: string;
  image_url: string;
  numeros_disponiveis: string[];
}

const TABLE_MAP: Record<Category, "chuteiras_campo" | "chuteiras_futsal" | "chuteiras_society"> = {
  campo: "chuteiras_campo",
  futsal: "chuteiras_futsal",
  society: "chuteiras_society",
};

export const useCatalog = (categoria: Category | null = null, numeroFiltro?: string) => {
  return useQuery({
    queryKey: ["chuteiras", categoria, numeroFiltro],
    queryFn: async (): Promise<Chuteira[]> => {
      let allChuteiras: Chuteira[] = [];

      if (categoria) {
        // Buscar de uma tabela específica
        const tableName = TABLE_MAP[categoria];
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('nome', { ascending: true });

        if (error) {
          console.error('Erro ao buscar chuteiras:', error);
          throw error;
        }

        if (data) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Catalog] Dados de ${categoria}:`, data.map(d => ({ nome: d.nome, image_url: d.image_url })));
          }
          allChuteiras = data.map((item) => ({
            id: `${categoria}-${item.id}`,
            nome: item.nome,
            image_url: item.image_url || '',
            numeros_disponiveis: item.tamanho ? item.tamanho.split(',').map(t => t.trim()) : []
          }));
        }
      } else {
        // Buscar de todas as tabelas
        const [campoRes, futsalRes, societyRes] = await Promise.all([
          supabase.from('chuteiras_campo').select('*').order('nome', { ascending: true }),
          supabase.from('chuteiras_futsal').select('*').order('nome', { ascending: true }),
          supabase.from('chuteiras_society').select('*').order('nome', { ascending: true }),
        ]);

        if (campoRes.error) throw campoRes.error;
        if (futsalRes.error) throw futsalRes.error;
        if (societyRes.error) throw societyRes.error;

        const mapData = (data: any[], prefix: string) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Catalog] Dados de ${prefix}:`, data?.map(d => ({ nome: d.nome, image_url: d.image_url })));
          }
          return (data || []).map((item) => ({
            id: `${prefix}-${item.id}`,
            nome: item.nome,
            image_url: item.image_url || '',
            numeros_disponiveis: item.tamanho ? item.tamanho.split(',').map((t: string) => t.trim()) : []
          }));
        };

        allChuteiras = [
          ...mapData(campoRes.data, 'campo'),
          ...mapData(futsalRes.data, 'futsal'),
          ...mapData(societyRes.data, 'society'),
        ].sort((a, b) => a.nome.localeCompare(b.nome));
      }

      // Aplicar filtro de numeração se especificado
      if (numeroFiltro) {
        return allChuteiras.filter(chuteira => 
          chuteira.numeros_disponiveis.includes(numeroFiltro)
        );
      }

      return allChuteiras;
    },
    staleTime: 5 * 60 * 1000,
  });
};