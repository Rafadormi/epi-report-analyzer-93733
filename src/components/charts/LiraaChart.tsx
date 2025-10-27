import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { LiraaData } from "@/data/epidemiologicalData";

interface LiraaChartProps {
  data: LiraaData;
  year: number;
}

export const LiraaChart = ({ data, year }: LiraaChartProps) => {
  const chartData = data.ciclos.map((cycle, index) => ({
    cycle,
    iip: data.iip[index],
  }));

  const getStatus = (iip: number) => {
    if (iip < 1) return "Satisfatório";
    if (iip < 4) return "Alerta";
    return "Risco";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">LIRAa - {year}</CardTitle>
        <CardDescription>Índice de Infestação Predial (IIP) por ciclo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="cycle" className="text-xs" />
            <YAxis className="text-xs" label={{ value: "IIP (%)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: number) => [
                `${value.toFixed(1)}% - ${getStatus(value)}`,
                "IIP",
              ]}
            />
            <ReferenceLine y={1} stroke="hsl(var(--success))" strokeDasharray="3 3" />
            <ReferenceLine y={4} stroke="hsl(var(--alert))" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="iip"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>&lt;1% Satisfatório</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span>1-3,9% Alerta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-alert" />
            <span>≥4% Risco</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
