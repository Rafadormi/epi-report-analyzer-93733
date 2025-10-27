import { getYearData } from "@/data/epidemiologicalData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import { EpidemicCurveChart } from "./charts/EpidemicCurveChart";
import { MonthlyChart } from "./charts/MonthlyChart";
import { LiraaChart } from "./charts/LiraaChart";
import { EconomicImpactChart } from "./charts/EconomicImpactChart";
import { IndicatorsChart } from "./charts/IndicatorsChart";
import { AgeDistributionChart } from "./charts/AgeDistributionChart";
import { SexDistributionChart } from "./charts/SexDistributionChart";
import { InfoDengueAlertsChart } from "./charts/InfoDengueAlertsChart";
import { RtChart } from "./charts/RtChart";
import { CasosEstimadosChart } from "./charts/CasosEstimadosChart";
import { NivelAlertaChart } from "./charts/NivelAlertaChart";
import { ClimaChart } from "./charts/ClimaChart";
import { AnalysisBox } from "./AnalysisBox";
import { CostSummaryCard } from "./CostSummaryCard";
import { AlertTriangle, TrendingUp, DollarSign, Users, Activity, FileText, Bug, TrendingDown } from "lucide-react";

interface YearReportProps {
  year: number;
}

export const YearReport = ({ year }: YearReportProps) => {
  const data = getYearData(year);

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Dados não disponíveis para {year}</p>
      </div>
    );
  }

  const { indicadores, impactoEconomico, infoDengue, clima } = data;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ========== HERO SECTION ========== */}
      <Card className="bg-gradient-hero border-primary/20">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            Relatório Epidemiológico — Dengue em Perobal/PR
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground font-semibold">
            Ano {year}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Notificações"
          value={indicadores.notificacoes.toLocaleString("pt-BR")}
          icon={FileText}
          iconColor="text-muted-foreground"
          bgColor="bg-muted"
        />
        <StatCard
          title="Casos Confirmados"
          value={indicadores.confirmados.toLocaleString("pt-BR")}
          icon={Users}
          iconColor="text-primary"
          bgColor="bg-primary/10"
        />
        <StatCard
          title="Taxa de Ataque"
          value={indicadores.taxaAtaque.toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          subtitle="por 100.000 hab."
          icon={TrendingUp}
          iconColor="text-alert"
          bgColor="bg-alert/10"
        />
        <StatCard
          title="Custo Total"
          value={`R$ ${(impactoEconomico.total / 1000).toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}K`}
          icon={DollarSign}
          iconColor="text-success"
          bgColor="bg-success/10"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Casos Graves"
          value={indicadores.graves.toString()}
          icon={AlertTriangle}
          iconColor="text-secondary"
          bgColor="bg-secondary/10"
        />
        <StatCard
          title="Óbitos"
          value={indicadores.obitos.toString()}
          icon={Activity}
          iconColor="text-alert"
          bgColor="bg-alert/10"
        />
        {indicadores.taxaConfirmacao !== undefined && (
          <StatCard
            title="Taxa de Confirmação"
            value={`${indicadores.taxaConfirmacao.toFixed(1)}%`}
            icon={TrendingUp}
            iconColor="text-success"
            bgColor="bg-success/10"
          />
        )}
      </div>

      {/* ========== MÓDULO 2: ANÁLISE EPIDEMIOLÓGICA DESCRITIVA ========== */}
      <div className="modulo">
        <Card className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">MÓDULO 2: Análise Epidemiológica Descritiva</CardTitle>
          </CardHeader>
        </Card>

        {/* Seção 2.1: Caracterização do Cenário */}
        <div className="secao">
          <h3 className="text-xl font-semibold text-primary mb-4">2.1 Caracterização do Cenário</h3>
          
          <AnalysisBox icon={FileText}>
            <p>
              O ano de {year} registrou{" "}
              <strong className="text-primary">{indicadores.notificacoes} notificações</strong> de dengue
              em Perobal, com <strong className="text-primary">{indicadores.confirmados} casos confirmados</strong>,
              representando uma taxa de confirmação de{" "}
              <strong className="text-primary">{indicadores.taxaConfirmacao.toFixed(1)}%</strong>.
            </p>
            <p>
              A <strong>taxa de ataque</strong> foi de{" "}
              <strong className="text-alert">
                {indicadores.taxaAtaque.toLocaleString("pt-BR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}{" "}
                casos por 100.000 habitantes
              </strong>, considerando a população estimada de {indicadores.populacao.toLocaleString("pt-BR")}{" "}
              habitantes.
            </p>
            {indicadores.obitos > 0 && (
              <p className="text-alert font-semibold">
                Foram registrados <strong>{indicadores.obitos}</strong>{" "}
                {indicadores.obitos === 1 ? "óbito" : "óbitos"} em decorrência da doença
                {indicadores.taxaLetalidade !== undefined &&
                  ` (taxa de letalidade: ${indicadores.taxaLetalidade.toFixed(2)}%)`}.
              </p>
            )}
          </AnalysisBox>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <IndicatorsChart data={indicadores} year={year} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <EpidemicCurveChart data={data.casosPorSemana} year={year} />
            {data.casosPorMes && <MonthlyChart data={data.casosPorMes} year={year} />}
          </div>
        </div>

        {/* Seção 2.2: Perfil Demográfico e Clínico */}
        <div className="secao">
          <h3 className="text-xl font-semibold text-primary mb-4">2.2 Perfil Demográfico e Clínico</h3>
          
          <AnalysisBox icon={Users}>
            <p>
              A análise do perfil demográfico revela que a dengue afetou diferentes faixas etárias e ambos os sexos.
              A distribuição por sexo mostra um padrão característico da doença, enquanto a pirâmide etária
              identifica os grupos mais vulneráveis na população.
            </p>
            <p>
              <strong>Casos graves:</strong> {indicadores.graves} ({indicadores.proporcaoGraves.toFixed(1)}% do total)
            </p>
          </AnalysisBox>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <SexDistributionChart data={data.piramideEtaria} year={year} />
            <AgeDistributionChart data={data.piramideEtaria} year={year} />
          </div>
        </div>
      </div>

      {/* ========== MÓDULO 3: ANÁLISE INTEGRADA E INTELIGÊNCIA ESTRATÉGICA ========== */}
      <div className="modulo">
        <Card className="bg-gradient-to-r from-secondary/10 to-transparent border-l-4 border-l-secondary">
          <CardHeader>
            <CardTitle className="text-2xl text-secondary">MÓDULO 3: Análise Integrada e Inteligência Estratégica</CardTitle>
          </CardHeader>
        </Card>

        {/* Seção 3.1: Vigilância Entomológica */}
        <div className="secao">
          <h3 className="text-xl font-semibold text-primary mb-4">3.1 Vigilância Entomológica</h3>
          
          <AnalysisBox icon={Bug} variant="warning">
            <p>
              Os ciclos de Levantamento de Índice Rápido de Aedes aegypti (LIRAa) demonstram a evolução
              do Índice de Infestação Predial (IIP) ao longo do ano.
            </p>
            <p>
              <strong>Classificação de Risco:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>IIP &lt; 1%: Risco Satisfatório</li>
              <li>IIP 1-3,9%: Médio Risco (Situação de Alerta)</li>
              <li>IIP ≥ 4%: Alto Risco para transmissão</li>
            </ul>
          </AnalysisBox>

          <div className="grid grid-cols-1 mt-6">
            <LiraaChart data={data.liraa} year={year} />
          </div>
        </div>

        {/* Seção 3.2: Fatores Preditivos */}
        {infoDengue && (
          <div className="secao">
            <h3 className="text-xl font-semibold text-primary mb-4">3.2 Fatores Preditivos</h3>
            
            <AnalysisBox icon={TrendingUp} variant="info">
              <p>
                O sistema <strong>InfoDengue</strong> integra dados epidemiológicos, climáticos e entomológicos
                para gerar alertas precoces sobre o risco de epidemia. A análise comparativa entre casos
                reais e alertas permite avaliar a efetividade do sistema de vigilância.
              </p>
              {infoDengue.rt && (
                <p>
                  O <strong>número reprodutivo efetivo (Rt)</strong> indica quantas pessoas, em média, cada
                  infectado pode transmitir a doença. Valores de Rt &gt; 1 indicam crescimento exponencial
                  da epidemia.
                </p>
              )}
            </AnalysisBox>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <InfoDengueAlertsChart data={infoDengue} year={year} />
            </div>

            {/* Gráficos adicionais para 2025 */}
            {year === 2025 && infoDengue.rt && infoDengue.casosEstimados && infoDengue.nivelAlerta && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <RtChart data={infoDengue} year={year} />
                <CasosEstimadosChart data={infoDengue} year={year} />
              </div>
            )}

            {year === 2025 && infoDengue.nivelAlerta && (
              <div className="grid grid-cols-1 gap-6 mt-6">
                <NivelAlertaChart data={infoDengue} year={year} />
              </div>
            )}
          </div>
        )}

        {/* Seção 3.3: Impacto Socioeconômico */}
        <div className="secao">
          <h3 className="text-xl font-semibold text-primary mb-4">3.3 Impacto Socioeconômico</h3>
          
          <AnalysisBox icon={DollarSign} variant="success">
            <p>
              O impacto econômico da dengue contempla <strong>custos diretos</strong> relacionados ao
              tratamento dos casos pelo Sistema Único de Saúde (SUS) e gastos das famílias, além de
              <strong> custos indiretos</strong> decorrentes da perda de produtividade, afastamentos do
              trabalho e outros fatores socioeconômicos.
            </p>
            <p>
              Em {year}, o custo total estimado da epidemia foi de{" "}
              <strong className="text-primary text-lg">
                R$ {impactoEconomico.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </strong>.
            </p>
          </AnalysisBox>

          <div className="mt-6">
            <CostSummaryCard total={impactoEconomico.total} year={year} />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <EconomicImpactChart data={impactoEconomico} year={year} />
          </div>
        </div>
      </div>

      {/* ========== MÓDULO 4: ANÁLISE CLIMÁTICA (APENAS 2025) ========== */}
      {year === 2025 && clima && (
        <div className="modulo">
          <Card className="bg-gradient-to-r from-alert/10 to-transparent border-l-4 border-l-alert">
            <CardHeader>
              <CardTitle className="text-2xl text-alert">MÓDULO 4: Análise Climática e Receptividade Vetorial</CardTitle>
            </CardHeader>
          </Card>

          <div className="secao">
            <AnalysisBox icon={TrendingDown} variant="warning">
              <p>
                As condições climáticas desempenham papel fundamental na transmissão da dengue, influenciando
                diretamente o ciclo de vida do mosquito Aedes aegypti. Temperatura e umidade adequadas
                favorecem a reprodução do vetor e aceleram o desenvolvimento dos ovos até a fase adulta.
              </p>
              <p>
                <strong>Condições favoráveis ao vetor:</strong> Temperatura entre 22-32°C e umidade relativa
                acima de 60%. Nestas condições, o ciclo de vida do mosquito pode ser completado em apenas
                7-10 dias.
              </p>
            </AnalysisBox>

            <div className="mt-6">
              <ClimaChart data={clima} year={year} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
