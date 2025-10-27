import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllYears, getYearData } from "@/data/epidemiologicalData";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

export const ComparisonPanel = () => {
  const years = getAllYears();
  const [year1, setYear1] = useState(years[0]);
  const [year2, setYear2] = useState(years[years.length - 1]);

  const data1 = getYearData(year1);
  const data2 = getYearData(year2);

  if (!data1 || !data2) return null;

  const calculateChange = (val1: number, val2: number) => {
    if (val1 === 0) return val2 > 0 ? 100 : 0;
    return ((val2 - val1) / val1) * 100;
  };

  const casesChange = calculateChange(data1.indicadores.confirmados, data2.indicadores.confirmados);
  const attackRateChange = calculateChange(data1.indicadores.taxaAtaque, data2.indicadores.taxaAtaque);
  const costChange = calculateChange(data1.impactoEconomico.total, data2.impactoEconomico.total);

  const comparisonData = [
    {
      metric: "Casos",
      [year1]: data1.indicadores.confirmados,
      [year2]: data2.indicadores.confirmados,
    },
    {
      metric: "Taxa de Ataque",
      [year1]: data1.indicadores.taxaAtaque,
      [year2]: data2.indicadores.taxaAtaque,
    },
    {
      metric: "Custo (x1000)",
      [year1]: data1.impactoEconomico.total / 1000,
      [year2]: data2.impactoEconomico.total / 1000,
    },
  ];

  const ChangeIndicator = ({ value }: { value: number }) => {
    if (value > 0)
      return (
        <span className="text-alert flex items-center gap-1">
          <ArrowUpIcon className="w-4 h-4" />
          +{value.toFixed(1)}%
        </span>
      );
    if (value < 0)
      return (
        <span className="text-success flex items-center gap-1">
          <ArrowDownIcon className="w-4 h-4" />
          {value.toFixed(1)}%
        </span>
      );
    return (
      <span className="text-muted-foreground flex items-center gap-1">
        <MinusIcon className="w-4 h-4" />
        0%
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Comparação entre Anos</CardTitle>
        <CardDescription>Selecione dois anos para comparar indicadores</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Ano 1</label>
            <Select value={year1.toString()} onValueChange={(v) => setYear1(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Ano 2</label>
            <Select value={year2.toString()} onValueChange={(v) => setYear2(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Casos Confirmados</p>
            <p className="text-2xl font-bold">{data2.indicadores.confirmados}</p>
            <ChangeIndicator value={casesChange} />
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Taxa de Ataque</p>
            <p className="text-2xl font-bold">{data2.indicadores.taxaAtaque.toFixed(1)}</p>
            <ChangeIndicator value={attackRateChange} />
          </div>
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Custo Total</p>
            <p className="text-2xl font-bold">
              R$ {(data2.impactoEconomico.total / 1000).toFixed(1)}K
            </p>
            <ChangeIndicator value={costChange} />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="metric" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey={year1.toString()} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey={year2.toString()} fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
