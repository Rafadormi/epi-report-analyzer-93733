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
  ReferenceLine,
  Legend,
} from "recharts";
import { InfoDengue } from "@/data/epidemiologicalData";

interface RtChartProps {
  data: InfoDengue;
  year: number;
}

export const RtChart = ({ data, year }: RtChartProps) => {
  const chartData = data.semanas.map((week, index) => ({
    week,
    rt: data.rt?.[index] || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Número Reprodutivo Efetivo (Rt) - {year}</CardTitle>
        <CardDescription>Rt &gt; 1 indica crescimento da epidemia</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorRtAbove" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--alert))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--alert))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorRtBelow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="week"
              label={{ value: "Semana Epidemiológica", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis
              label={{ value: "Rt", angle: -90, position: "insideLeft" }}
              className="text-xs"
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelFormatter={(label) => `Semana ${label}`}
              formatter={(value: number) => [value.toFixed(2), "Rt"]}
            />
            <Legend />
            <ReferenceLine
              y={1}
              stroke="hsl(var(--foreground))"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{ value: "Rt = 1 (Limiar)", position: "right" }}
            />
            <Area
              type="monotone"
              dataKey="rt"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRtAbove)"
              name="Rt"
            />
            <Line
              type="monotone"
              dataKey="rt"
              stroke="hsl(var(--secondary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--secondary))", r: 3 }}
              name="Rt"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
