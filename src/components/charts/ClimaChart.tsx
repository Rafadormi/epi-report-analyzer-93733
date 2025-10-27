import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Line,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Clima } from "@/data/epidemiologicalData";

interface ClimaChartProps {
  data: Clima;
  year: number;
}

export const ClimaChart = ({ data, year }: ClimaChartProps) => {
  const chartData = data.semanas.map((week, index) => ({
    week,
    tempMin: data.tempMin[index],
    tempMed: data.tempMed[index],
    tempMax: data.tempMax[index],
    umidMin: data.umidMin[index],
    umidMed: data.umidMed[index],
    umidMax: data.umidMax[index],
    favoravel: data.favoravelVetor[index] === "Sim",
  }));

  return (
    <div className="space-y-6">
      {/* Gráfico de Temperatura */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Temperatura (°C) - {year}</CardTitle>
          <CardDescription>Variação da temperatura ao longo das semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--alert))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--alert))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="week"
                label={{ value: "Semana Epidemiológica", position: "insideBottom", offset: -5 }}
                className="text-xs"
              />
              <YAxis
                label={{ value: "Temperatura (°C)", angle: -90, position: "insideLeft" }}
                className="text-xs"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelFormatter={(label) => `Semana ${label}`}
                formatter={(value: number) => [`${value.toFixed(1)}°C`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="tempMax"
                stroke="none"
                fillOpacity={1}
                fill="url(#colorTemp)"
                name="Faixa de Temperatura"
              />
              <Line
                type="monotone"
                dataKey="tempMed"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                name="Temp. Média"
              />
              <Line
                type="monotone"
                dataKey="tempMin"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Temp. Mínima"
              />
              <Line
                type="monotone"
                dataKey="tempMax"
                stroke="hsl(var(--alert))"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Temp. Máxima"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Umidade */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Umidade Relativa (%) - {year}</CardTitle>
          <CardDescription>Variação da umidade ao longo das semanas</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="colorUmid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="week"
                label={{ value: "Semana Epidemiológica", position: "insideBottom", offset: -5 }}
                className="text-xs"
              />
              <YAxis
                label={{ value: "Umidade (%)", angle: -90, position: "insideLeft" }}
                className="text-xs"
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
                labelFormatter={(label) => `Semana ${label}`}
                formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="umidMax"
                stroke="none"
                fillOpacity={1}
                fill="url(#colorUmid)"
                name="Faixa de Umidade"
              />
              <Line
                type="monotone"
                dataKey="umidMed"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={false}
                name="Umid. Média"
              />
              <Line
                type="monotone"
                dataKey="umidMin"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Umid. Mínima"
              />
              <Line
                type="monotone"
                dataKey="umidMax"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Umid. Máxima"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Indicador de Receptividade Vetorial */}
      <Card className="border-l-4 border-l-alert">
        <CardHeader>
          <CardTitle className="text-primary">Receptividade Vetorial - {year}</CardTitle>
          <CardDescription>Períodos favoráveis para desenvolvimento do Aedes aegypti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Condições Favoráveis:</strong> Temperatura entre 22-32°C e Umidade acima de 60%
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.favoravel
                      ? "bg-alert/20 text-alert border border-alert/40"
                      : "bg-success/20 text-success border border-success/40"
                  }`}
                >
                  SE{item.week}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Análise:</strong> De {chartData.filter(d => d.favoravel).length} semanas analisadas,{" "}
              <span className="font-bold text-alert">
                {chartData.filter(d => d.favoravel).length}
              </span>{" "}
              apresentaram condições climáticas favoráveis ao vetor.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
