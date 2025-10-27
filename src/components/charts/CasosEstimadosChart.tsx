import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { InfoDengue } from "@/data/epidemiologicalData";

interface CasosEstimadosChartProps {
  data: InfoDengue;
  year: number;
}

export const CasosEstimadosChart = ({ data, year }: CasosEstimadosChartProps) => {
  const chartData = data.semanas.map((week, index) => ({
    week,
    casosReais: data.casosReais[index],
    casosEstimados: data.casosEstimados?.[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Nowcasting - Casos Estimados - {year}</CardTitle>
        <CardDescription>Comparação entre casos reais e estimados pelo modelo preditivo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="week"
              label={{ value: "Semana Epidemiológica", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis
              label={{ value: "Número de Casos", angle: -90, position: "insideLeft" }}
              className="text-xs"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelFormatter={(label) => `Semana ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="casosReais"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 4 }}
              name="Casos Reais"
            />
            <Line
              type="monotone"
              dataKey="casosEstimados"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "hsl(var(--secondary))", r: 3 }}
              name="Casos Estimados (Nowcasting)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
