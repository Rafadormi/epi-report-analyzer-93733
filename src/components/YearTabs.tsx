import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllYears } from "@/data/epidemiologicalData";
import { YearReport } from "./YearReport";

export const YearTabs = () => {
  const years = getAllYears();

  return (
    <Tabs defaultValue={years[0].toString()} className="w-full">
      <TabsList className="grid w-full grid-cols-6 mb-8 bg-muted">
        {years.map((year) => (
          <TabsTrigger
            key={year}
            value={year.toString()}
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
          >
            {year}
          </TabsTrigger>
        ))}
      </TabsList>

      {years.map((year) => (
        <TabsContent key={year} value={year.toString()} className="mt-0">
          <YearReport year={year} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
