import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface CostSummaryCardProps {
  total: number;
  year: number;
}

export const CostSummaryCard = ({ total, year }: CostSummaryCardProps) => {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90 mb-2">Custo Total da Epidemia {year}</p>
            <div className="text-4xl font-bold">
              R$ {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs opacity-80 mt-2">
              Incluindo custos diretos (SUS + famílias) e indiretos (produtividade)
            </p>
          </div>
          <div className="p-4 rounded-full bg-white/20">
            <DollarSign className="h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
