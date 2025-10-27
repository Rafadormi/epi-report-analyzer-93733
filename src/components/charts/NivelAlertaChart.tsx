import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { InfoDengue } from "@/data/epidemiologicalData";

interface NivelAlertaChartProps {
  data: InfoDengue;
  year: number;
}

const getNivelColor = (nivel: number) => {
  switch (nivel) {
    case 1:
      return "#70ad47"; // Verde
    case 2:
      return "#f79646"; // Amarelo
    case 3:
      return "#ed7d31"; // Laranja
    case 4:
      return "#c55a5a"; // Vermelho
    default:
      return "#cccccc";
  }
};

const getNivelLabel = (nivel: number) => {
  switch (nivel) {
    case 1:
      return "Verde (Baixo)";
    case 2:
      return "Amarelo (Moderado)";
    case 3:
      return "Laranja (Alto)";
    case 4:
      return "Vermelho (Crítico)";
    default:
      return "Desconhecido";
  }
};

export const NivelAlertaChart = ({ data, year }: NivelAlertaChartProps) => {
  const chartData = data.semanas.map((week, index) => ({
    week,
    nivel: data.nivelAlerta?.[index] || 0,
    nivelLabel: getNivelLabel(data.nivelAlerta?.[index] || 0),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Nível de Alerta por Semana - {year}</CardTitle>
        <CardDescription>Evolução do nível de risco epidemiológico</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="week"
              label={{ value: "Semana Epidemiológica", position: "insideBottom", offset: -5 }}
              className="text-xs"
            />
            <YAxis
              label={{ value: "Nível de Alerta", angle: -90, position: "insideLeft" }}
              className="text-xs"
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelFormatter={(label) => `Semana ${label}`}
              formatter={(value: number, name: string, props: any) => [
                props.payload.nivelLabel,
                "Nível"
              ]}
            />
            <Legend />
            <Area
              type="stepAfter"
              dataKey="nivel"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              fill="hsl(var(--secondary))"
              fillOpacity={0.6}
              name="Nível de Alerta"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#70ad47" }}></div>
            <span>Nível 1 - Verde (Baixo)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f79646" }}></div>
            <span>Nível 2 - Amarelo (Moderado)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ed7d31" }}></div>
            <span>Nível 3 - Laranja (Alto)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#c55a5a" }}></div>
            <span>Nível 4 - Vermelho (Crítico)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
