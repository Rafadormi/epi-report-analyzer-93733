import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { EconomicImpact } from "@/data/epidemiologicalData";

interface EconomicImpactChartProps {
  data: EconomicImpact;
  year: number;
}

export const EconomicImpactChart = ({ data, year }: EconomicImpactChartProps) => {
  const chartData = data.categorias.map((categoria, index) => ({
    categoria,
    valor: data.valores[index],
    percentual: data.percentuais[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Impacto Econômico - {year}</CardTitle>
        <CardDescription>Custos estimados (SUS vs Sociedade)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="categoria" className="text-xs" angle={-45} textAnchor="end" height={80} />
            <YAxis
              tickFormatter={(value) =>
                `R$ ${(value / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}K`
              }
              className="text-xs"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number, name: string, props: any) => [
                `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} (${props.payload.percentual}%)`,
                "",
              ]}
            />
            <Bar dataKey="valor" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Custo Total:{" "}
            <span className="font-bold text-success">
              R$ {data.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
