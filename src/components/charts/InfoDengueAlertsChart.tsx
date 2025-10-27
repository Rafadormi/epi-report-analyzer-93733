import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { InfoDengue } from "@/data/epidemiologicalData";

interface InfoDengueAlertsChartProps {
  data: InfoDengue;
  year: number;
}

export const InfoDengueAlertsChart = ({ data, year }: InfoDengueAlertsChartProps) => {
  const chartData = data.semanas.map((week, index) => ({
    week,
    casosReais: data.casosReais[index],
    alertas: data.alertas?.[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Alertas InfoDengue - {year}</CardTitle>
        <CardDescription>Casos reais vs alertas do sistema de vigilância</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorAlertas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--alert))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--alert))" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="alertas"
              stroke="hsl(var(--alert))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAlertas)"
              name="Alertas InfoDengue"
            />
            <Line
              type="monotone"
              dataKey="casosReais"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 3 }}
              name="Casos Reais"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
