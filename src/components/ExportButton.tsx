import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { PrintableReport } from "./PrintableReport";
import { createRoot } from "react-dom/client";

interface ExportButtonProps {
  year?: number;
}

export const ExportButton = ({ year }: ExportButtonProps) => {
  const handlePrint = () => {
    window.print();
    toast.success("Preparando impressão...", {
      description: "A janela de impressão será aberta em instantes.",
    });
  };

  const handleExportPDF = async () => {
    if (!year) {
      toast.error("Selecione um ano para exportar");
      return;
    }

    toast.loading("Gerando PDF...", { id: "pdf-export" });

    try {
      // Create a temporary container
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      document.body.appendChild(container);

      // Render the report component
      const root = createRoot(container);
      root.render(<PrintableReport year={year} />);

      // Wait for render
      await new Promise(resolve => setTimeout(resolve, 1000));

      const element = container.querySelector(".print-report") as HTMLElement;
      
      if (element) {
        const opt = {
          margin: 0,
          filename: `relatorio-dengue-perobal-${year}.pdf`,
          image: { type: "jpeg" as const, quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
          },
          jsPDF: { 
            unit: "mm" as const, 
            format: "a4" as const, 
            orientation: "portrait" as const
          },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] }
        };

        await html2pdf().set(opt).from(element).save();
        
        toast.success("PDF gerado com sucesso!", { id: "pdf-export" });
      } else {
        throw new Error("Elemento não encontrado");
      }

      // Cleanup
      root.unmount();
      document.body.removeChild(container);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast.error("Erro ao gerar PDF. Tente usar a impressão (Ctrl+P).", { id: "pdf-export" });
    }
  };

  return (
    <div className="flex gap-2 print:hidden">
      <Button onClick={handlePrint} className="gap-2">
        <Printer className="h-4 w-4" />
        Imprimir
      </Button>
      <Button onClick={handleExportPDF} variant="outline" className="gap-2">
        <FileDown className="h-4 w-4" />
        Exportar PDF
      </Button>
    </div>
  );
};
