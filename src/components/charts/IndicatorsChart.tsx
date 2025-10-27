import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Indicators } from "@/data/epidemiologicalData";

interface IndicatorsChartProps {
  data: Indicators;
  year: number;
}

export const IndicatorsChart = ({ data, year }: IndicatorsChartProps) => {
  const chartData = [
    { name: "Confirmados", value: data.confirmados, color: "hsl(var(--primary))" },
    { name: "Descartados", value: data.descartados, color: "hsl(var(--muted-foreground))" },
    { name: "Inconclusivos", value: data.inconclusivos, color: "hsl(var(--secondary))" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Indicadores Epidemiológicos - {year}</CardTitle>
        <CardDescription>Distribuição de notificações por classificação</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [value.toLocaleString("pt-BR"), ""]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
