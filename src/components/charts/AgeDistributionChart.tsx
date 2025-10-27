import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PiramideEtaria } from "@/data/epidemiologicalData";

interface AgeDistributionChartProps {
  data: PiramideEtaria;
  year: number;
}

export const AgeDistributionChart = ({ data, year }: AgeDistributionChartProps) => {
  const chartData = data.faixas.map((faixa, index) => ({
    faixa,
    Feminino: data.feminino[index],
    Masculino: -data.masculino[index], // Negative for left side of pyramid
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Pirâmide Etária - {year}</CardTitle>
        <CardDescription>Distribuição de casos por idade e sexo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              type="number" 
              tickFormatter={(value) => Math.abs(value).toString()}
              label={{ value: "Número de Casos", position: "insideBottom", offset: -5 }}
            />
            <YAxis 
              dataKey="faixa" 
              type="category" 
              width={90} 
              className="text-xs"
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [Math.abs(value), ""]}
              labelFormatter={(label) => `Faixa Etária: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="Masculino" 
              fill="#4299e1" 
              radius={[4, 0, 0, 4]}
              label={{ position: "left", formatter: (value: number) => Math.abs(value) }}
            />
            <Bar 
              dataKey="Feminino" 
              fill="#f687b3" 
              radius={[0, 4, 4, 0]}
              label={{ position: "right" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
