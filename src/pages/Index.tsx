import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { YearTabs } from "@/components/YearTabs";
import { ComparisonPanel } from "@/components/ComparisonPanel";
import { SearchFilter, FilterOptions } from "@/components/SearchFilter";
import { ExportButton } from "@/components/ExportButton";
import { BarChart3, GitCompare, Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = (query: string, filterOptions: FilterOptions) => {
    setSearchQuery(query);
    setFilters(filterOptions);
    // In a real implementation, this would filter the displayed data
    console.log("Searching:", query, filterOptions);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-lg print:hidden">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="https://i.postimg.cc/tYfYXzSv/brasao-municipio.png"
                alt="Brasão de Perobal"
                className="h-16 w-16"
              />
              <div>
                <h1 className="text-3xl font-bold">Sistema de Análise Epidemiológica</h1>
                <p className="text-primary-foreground/90 text-sm">
                  Prefeitura Municipal de Perobal/PR - Vigilância em Saúde
                </p>
              </div>
            </div>
            <ExportButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="years" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted print:hidden">
            <TabsTrigger value="years" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Relatórios por Ano
            </TabsTrigger>
            <TabsTrigger value="comparison" className="gap-2">
              <GitCompare className="h-4 w-4" />
              Comparação
            </TabsTrigger>
            <TabsTrigger value="search" className="gap-2">
              <Search className="h-4 w-4" />
              Busca Avançada
            </TabsTrigger>
          </TabsList>

          <TabsContent value="years" className="mt-0">
            <YearTabs />
          </TabsContent>

          <TabsContent value="comparison" className="mt-0">
            <ComparisonPanel />
          </TabsContent>

          <TabsContent value="search" className="mt-0">
            <SearchFilter onSearch={handleSearch} />
            
            {searchQuery && (
              <div className="mt-6 p-6 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Resultados da Busca</h3>
                <p className="text-sm text-muted-foreground">
                  Esta funcionalidade filtraria os dados exibidos com base nos critérios selecionados.
                  Em uma implementação completa, os resultados apareceriam aqui.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-6 mt-12 print:hidden">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            <strong>Secretaria Municipal de Saúde de Perobal/PR</strong>
          </p>
          <p className="mt-1">Vigilância em Saúde - Sistema de Monitoramento Epidemiológico</p>
          <p className="mt-2 text-xs">© 2025 - Todos os direitos reservados</p>
        </div>
      </footer>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          header, footer, nav, .no-print {
            display: none !important;
          }

          main {
            padding: 0 !important;
            margin: 0 !important;
          }

          .page-break {
            page-break-before: always;
          }

          * {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
