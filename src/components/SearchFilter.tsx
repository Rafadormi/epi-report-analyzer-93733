import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  onSearch: (query: string, filters: FilterOptions) => void;
}

export interface FilterOptions {
  year?: string;
  metric?: string;
  minValue?: number;
}

export const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleClear = () => {
    setQuery("");
    setFilters({});
    onSearch("", {});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Search className="h-5 w-5" />
          Busca e Filtros
        </CardTitle>
        <CardDescription>
          Encontre rapidamente seções ou indicadores específicos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por indicador, seção ou palavra-chave..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={handleSearch}>Buscar</Button>
          {(query || Object.keys(filters).length > 0) && (
            <Button onClick={handleClear} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className="text-sm font-medium mb-2 block">Ano</label>
              <Select
                value={filters.year}
                onValueChange={(value) => setFilters({ ...filters, year: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todos os anos" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Todos os anos</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Métrica</label>
              <Select
                value={filters.metric}
                onValueChange={(value) => setFilters({ ...filters, metric: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Todas as métricas" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">Todas as métricas</SelectItem>
                  <SelectItem value="cases">Casos Totais</SelectItem>
                  <SelectItem value="incidence">Taxa de Incidência</SelectItem>
                  <SelectItem value="severe">Casos Graves</SelectItem>
                  <SelectItem value="cost">Custo Econômico</SelectItem>
                  <SelectItem value="liraa">LIRAa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Valor Mínimo</label>
              <Input
                type="number"
                placeholder="Ex: 100"
                value={filters.minValue || ""}
                onChange={(e) =>
                  setFilters({ ...filters, minValue: parseInt(e.target.value) || undefined })
                }
              />
            </div>
          </div>
        )}

        {query && (
          <div className="text-sm text-muted-foreground">
            <p>
              Buscando por: <strong className="text-foreground">{query}</strong>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
