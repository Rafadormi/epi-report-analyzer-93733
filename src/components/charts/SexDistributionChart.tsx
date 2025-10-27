import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PiramideEtaria } from "@/data/epidemiologicalData";

interface SexDistributionChartProps {
  data: PiramideEtaria;
  year: number;
}

export const SexDistributionChart = ({ data, year }: SexDistributionChartProps) => {
  const totalFeminino = data.feminino.reduce((sum, val) => sum + val, 0);
  const totalMasculino = data.masculino.reduce((sum, val) => sum + val, 0);
  const total = totalFeminino + totalMasculino;

  const chartData = [
    {
      name: "Feminino",
      value: totalFeminino,
      percent: ((totalFeminino / total) * 100).toFixed(1),
      color: "#f687b3",
    },
    {
      name: "Masculino",
      value: totalMasculino,
      percent: ((totalMasculino / total) * 100).toFixed(1),
      color: "#4299e1",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary">Distribuição por Sexo - {year}</CardTitle>
        <CardDescription>Casos confirmados por sexo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${percent}%`}
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
              formatter={(value: number, name: string, props: any) => [
                `${value} (${props.payload.percent}%)`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 rounded-lg bg-muted">
            <div className="text-2xl font-bold" style={{ color: "#f687b3" }}>
              {totalFeminino}
            </div>
            <div className="text-xs text-muted-foreground">Feminino</div>
          </div>
          <div className="p-3 rounded-lg bg-muted">
            <div className="text-2xl font-bold" style={{ color: "#4299e1" }}>
              {totalMasculino}
            </div>
            <div className="text-xs text-muted-foreground">Masculino</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
