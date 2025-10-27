import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CasosPorMes } from "@/data/epidemiologicalData";

interface MonthlyChartProps {
  data: CasosPorMes;
  year: number;
}

export const MonthlyChart = ({ data, year }: MonthlyChartProps) => {
  const chartData = data.meses.map((mes, index) => ({
    mes,
    notificados: data.notificados[index],
    confirmados: data.confirmados[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Casos por Mês - {year}</CardTitle>
        <CardDescription>Distribuição mensal de casos confirmados</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="mes" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            <Bar dataKey="notificados" fill="hsl(var(--muted-foreground))" name="Notificados" radius={[4, 4, 0, 0]} />
            <Bar dataKey="confirmados" fill="hsl(var(--secondary))" name="Confirmados" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
