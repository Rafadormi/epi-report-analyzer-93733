import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisBoxProps {
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "success" | "info";
  icon?: LucideIcon;
  className?: string;
}

export const AnalysisBox = ({
  title = "Análise da Equipe:",
  children,
  variant = "default",
  icon: Icon,
  className,
}: AnalysisBoxProps) => {
  const variantStyles = {
    default: "border-l-primary bg-primary/5",
    warning: "border-l-alert bg-alert/5",
    success: "border-l-success bg-success/5",
    info: "border-l-secondary bg-secondary/5",
  };

  return (
    <Card className={cn("border-l-4", variantStyles[variant], className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
        {children}
      </CardContent>
    </Card>
  );
};
