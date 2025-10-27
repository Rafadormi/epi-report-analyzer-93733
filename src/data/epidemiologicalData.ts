// Dados epidemiológicos de dengue em Perobal/PR (2020-2025)
// Fonte: dados_dengue_perobal.json

export interface Indicators {
  notificacoes: number;
  confirmados: number;
  descartados: number;
  inconclusivos: number;
  graves: number;
  obitos: number;
  taxaAtaque: number;
  taxaConfirmacao: number;
  proporcaoGraves: number;
  taxaLetalidade: number;
  populacao: number;
}

export interface CasosPorSemana {
  semanas: number[];
  notificados: number[];
  confirmados: number[];
}

export interface CasosPorMes {
  meses: string[];
  notificados: number[];
  confirmados: number[];
}

export interface PiramideEtaria {
  faixas: string[];
  feminino: number[];
  masculino: number[];
}

export interface LiraaData {
  ciclos: string[];
  iip: number[];
  classificacao: string[];
}

export interface EconomicImpact {
  total: number;
  categorias: string[];
  valores: number[];
  percentuais: number[];
}

export interface InfoDengue {
  semanas: number[];
  casosReais: number[];
  casosEstimados?: number[];
  rt?: number[];
  nivelAlerta?: number[];
  alertas?: (number | null)[];
}

export interface Clima {
  semanas: number[];
  tempMin: number[];
  tempMed: number[];
  tempMax: number[];
  umidMin: number[];
  umidMed: number[];
  umidMax: number[];
  favoravelVetor: string[];
}

export interface YearData {
  indicadores: Indicators;
  casosPorSemana: CasosPorSemana;
  casosPorMes: CasosPorMes;
  piramideEtaria: PiramideEtaria;
  liraa: LiraaData;
  impactoEconomico: EconomicImpact;
  infoDengue?: InfoDengue;
  clima?: Clima;
}

const epidemiologicalData: Record<number, YearData> = {
  2020: {
    indicadores: {
      notificacoes: 1299,
      confirmados: 977,
      descartados: 308,
      inconclusivos: 14,
      graves: 1,
      obitos: 1,
      taxaAtaque: 13698.8,
      taxaConfirmacao: 75.2,
      proporcaoGraves: 0.1,
      taxaLetalidade: 0.1,
      populacao: 7132,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],
      notificados: [2,2,12,18,28,50,92,138,150,171,181,122,96,51,47,31,29,20,13,18,7,0,3,1,2,0,3,0,0,2,0,0,0,2,0,0,0,0,2,1,1,0,0,2,1,0,0,0,0,0,1,0,0],
      confirmados: [1,2,2,8,18,29,51,95,106,125,144,106,83,45,44,30,28,16,13,16,5,0,2,1,1,0,3,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      notificados: [29, 275, 458, 163, 26, 7, 2, 0, 2, 1, 1, 0],
      confirmados: [29, 275, 458, 163, 26, 7, 2, 0, 2, 1, 1, 0],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [8, 26, 44, 93, 73, 106, 103, 80, 32, 34, 3],
      masculino: [5, 10, 24, 44, 63, 48, 55, 76, 22, 25, 3],
    },
    liraa: {
      ciclos: ["1º (Jan)", "3º (Jun)", "4º (Ago)", "5º (Out)", "6º (Dez)"],
      iip: [2.5, 0.8, 0.4, 1.3, 2.2],
      classificacao: ["Médio Risco", "Satisfatório", "Satisfatório", "Médio Risco", "Médio Risco"],
    },
    impactoEconomico: {
      total: 1401004.45,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [81254.45, 928250.00, 391500.00],
      percentuais: [5.8, 66.3, 27.9],
    },
    infoDengue: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      casosReais: [1, 2, 8, 18, 29, 51, 95, 106, 125, 144, 106, 83, 45, 44, 30, 28, 16, 13, 16, 5],
      alertas: [null, null, null, 5, 15, 40, 80, 100, 119, 130, 110, 85, 50, 35, 25, 20, 12, 10, 8, 4],
    },
  },
  2021: {
    indicadores: {
      notificacoes: 46,
      confirmados: 10,
      descartados: 36,
      inconclusivos: 0,
      graves: 0,
      obitos: 0,
      taxaAtaque: 140.2,
      taxaConfirmacao: 21.7,
      proporcaoGraves: 0.0,
      taxaLetalidade: 0.0,
      populacao: 7215,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
      notificados: [0,0,0,1,0,0,3,1,0,1,0,0,0,0,0,2,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      confirmados: [0,0,0,1,0,0,3,1,0,1,0,0,0,0,0,2,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      notificados: [1,4,1,1,2,0,0,0,0,0,1,0],
      confirmados: [1,4,1,1,2,0,0,0,0,0,1,0],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [0,1,1,1,1,2,1,1,0,0,0],
      masculino: [0,0,1,0,1,0,1,1,0,0,0],
    },
    liraa: {
      ciclos: ["1º (Jan)", "2º (Abr)", "3º (Jun)", "4º (Ago)", "5º (Out)", "6º (Dez)"],
      iip: [2.6, 0.8, 0.9, 0.4, 1.2, 0.9],
      classificacao: ["Médio Risco", "Satisfatório", "Satisfatório", "Satisfatório", "Médio Risco", "Satisfatório"],
    },
    impactoEconomico: {
      total: 14266.5,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [8266.5, 4000.0, 2000.0],
      percentuais: [57.9, 28.0, 14.1],
    },
  },
  2022: {
    indicadores: {
      notificacoes: 1153,
      confirmados: 297,
      descartados: 852,
      inconclusivos: 4,
      graves: 0,
      obitos: 0,
      taxaAtaque: 4164.3,
      taxaConfirmacao: 25.8,
      proporcaoGraves: 0.0,
      taxaLetalidade: 0.0,
      populacao: 7298,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
      notificados: [0,0,0,0,0,1,0,0,1,4,2,1,6,4,13,16,49,56,46,26,9,16,11,8,7,5,5,1,3,0,1,0,1,0,0,0,2,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
      confirmados: [0,0,0,0,0,1,0,0,1,4,2,1,6,4,13,16,49,56,46,26,9,16,11,8,7,5,5,1,3,0,1,0,1,0,0,0,2,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      notificados: [0,1,6,21,65,121,109,40,9,23,4,1],
      confirmados: [0,1,6,21,65,121,109,40,9,23,4,1],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [2,4,8,15,22,35,28,21,8,6,1],
      masculino: [1,3,6,12,18,26,23,19,7,5,1],
    },
    liraa: {
      ciclos: ["1º (Jan)", "2º (Abr)", "3º (Jun)", "4º (Ago)", "5º (Out)", "6º (Dez)"],
      iip: [1.2, 5.1, 1.7, 0.7, 2.0, 1.5],
      classificacao: ["Médio Risco", "Alto Risco", "Médio Risco", "Satisfatório", "Médio Risco", "Médio Risco"],
    },
    impactoEconomico: {
      total: 423715.05,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [22765.05, 282150.0, 118800.0],
      percentuais: [5.4, 66.6, 28.0],
    },
  },
  2023: {
    indicadores: {
      notificacoes: 694,
      confirmados: 160,
      descartados: 534,
      inconclusivos: 0,
      graves: 0,
      obitos: 0,
      taxaAtaque: 2187.6,
      taxaConfirmacao: 23.1,
      proporcaoGraves: 0.0,
      taxaLetalidade: 0.0,
      populacao: 7315,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
      notificados: [0,4,3,2,2,10,30,20,21,19,42,86,54,36,34,33,31,22,34,27,23,13,18,15,5,8,17,4,6,3,6,1,2,1,5,2,4,1,4,1,7,3,4,1,6,1,2,5,5,7,0],
      confirmados: [0,4,3,2,2,10,30,20,21,19,42,86,54,36,34,33,31,22,34,27,23,13,18,15,5,8,17,4,6,3,6,1,2,1,5,2,4,1,4,1,7,3,4,1,6,1,2,5,5,7,0],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      notificados: [9,15,81,176,134,103,72,45,23,19,15,2],
      confirmados: [9,15,81,176,134,103,72,45,23,19,15,2],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [1,3,5,9,12,18,15,11,4,3,0],
      masculino: [1,2,4,7,10,14,12,9,3,2,0],
    },
    liraa: {
      ciclos: ["1º (Jan)", "2º (Abr)", "3º (Jun)", "4º (Ago)", "5º (Out)", "6º (Dez)"],
      iip: [1.2, 3.2, 1.5, 0.7, 1.4, 2.2],
      classificacao: ["Médio Risco", "Médio Risco", "Médio Risco", "Satisfatório", "Médio Risco", "Médio Risco"],
    },
    impactoEconomico: {
      total: 228264.0,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [12264.0, 152000.0, 64000.0],
      percentuais: [5.4, 66.6, 28.0],
    },
  },
  2024: {
    indicadores: {
      notificacoes: 2357,
      confirmados: 1513,
      descartados: 844,
      inconclusivos: 0,
      graves: 0,
      obitos: 0,
      taxaAtaque: 21214.2,
      taxaConfirmacao: 64.2,
      proporcaoGraves: 0.0,
      taxaLetalidade: 0.0,
      populacao: 7496,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],
      notificados: [4,1,3,20,16,17,33,41,57,74,87,83,82,114,163,177,167,98,82,40,25,20,16,14,8,3,7,0,1,0,3,2,1,4,3,0,2,2,0,3,1,5,1,3,2,6,3,4,3,3,4,4],
      confirmados: [4,1,3,20,16,17,33,41,57,74,87,83,82,114,163,177,167,98,82,40,25,20,16,14,8,3,7,0,1,0,3,2,1,4,3,0,2,2,0,3,1,5,1,3,2,6,3,4,3,3,4,4],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      notificados: [28,57,174,340,446,392,285,172,84,52,35,22],
      confirmados: [28,57,174,340,446,392,285,172,84,52,35,22],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [12,18,25,45,68,95,88,65,25,20,2],
      masculino: [8,12,18,32,48,67,62,46,18,15,1],
    },
    liraa: {
      ciclos: ["1º (Jan)", "2º (Abr)", "3º (Jun)", "4º (Ago)"],
      iip: [6.9, 3.6, 1.4, 0.4],
      classificacao: ["Alto Risco", "Médio Risco", "Médio Risco", "Satisfatório"],
    },
    impactoEconomico: {
      total: 2157940.95,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [116488.48, 1437000.0, 604452.47],
      percentuais: [5.4, 66.6, 28.0],
    },
  },
  2025: {
    indicadores: {
      notificacoes: 410,
      confirmados: 142,
      descartados: 258,
      inconclusivos: 10,
      graves: 0,
      obitos: 0,
      taxaAtaque: 1991.0,
      taxaConfirmacao: 34.6,
      proporcaoGraves: 0.0,
      taxaLetalidade: 0.0,
      populacao: 7132,
    },
    casosPorSemana: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      notificados: [4,0,5,7,6,0,8,17,17,12,22,18,15,20,18,11,11,15,22,32,43,12,19,10,11,6,0,6,0,0],
      confirmados: [3,0,2,5,3,0,4,12,8,8,13,12,8,9,12,3,3,6,7,8,4,4,4,1,1,1,0,1,0,0],
    },
    casosPorMes: {
      meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
      notificados: [4,18,49,50,78,168,43],
      confirmados: [3,10,24,28,26,38,13],
    },
    piramideEtaria: {
      faixas: ["≥80 anos", "70-79 anos", "60-69 anos", "50-59 anos", "40-49 anos", "30-39 anos", "20-29 anos", "10-19 anos", "5-9 anos", "1-4 anos", "<1 ano"],
      feminino: [2,3,6,9,12,15,14,11,4,3,1],
      masculino: [1,3,5,7,9,11,10,8,3,3,1],
    },
    liraa: {
      ciclos: ["1º (Jan)", "2º (Mar)", "3º (Mai)", "4º (Jul)"],
      iip: [1.6, 1.3, 1.7, 0.8],
      classificacao: ["Médio Risco", "Médio Risco", "Médio Risco", "Satisfatório"],
    },
    impactoEconomico: {
      total: 202570.1,
      categorias: ["Custos Diretos SUS", "Perda de Produtividade", "Custos Diretos Famílias"],
      valores: [10934.0, 134900.0, 56736.1],
      percentuais: [5.4, 66.6, 28.0],
    },
    infoDengue: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      casosReais: [3,0,2,5,3,0,4,12,8,8,13,12,8,9,12,3,3,6,7,8,4,4,4,1,1,1,0,1,0,0],
      casosEstimados: [2,6,5,5,3,4,10,13,15,19,16,17,17,24,14,13,9,16,26,39,31,18,12,11,9,7,2,4,6,3],
      rt: [0.33,1.22,1.21,1.07,0.61,0.89,2.37,2.27,1.65,1.52,1.06,1.02,1.01,1.40,0.76,0.69,0.56,1.23,2.02,2.20,1.20,0.58,0.42,0.54,0.64,0.64,0.23,0.0,0.0,0.0],
      nivelAlerta: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,4,4,4,1,1,1,1,1,1,1,1],
    },
    clima: {
      semanas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
      tempMin: [21.9,20.4,23.0,23.1,22.2,22.6,23.0,23.4,24.0,24.5,21.7,20.9,22.7,22.0,19.6,19.5,19.0,16.5,19.9,17.4,19.1,13.7,16.8,12.3,17.1,12.2,12.3,12.1,13.8,12.5],
      tempMed: [26.2,26.3,27.3,26.7,26.0,25.7,27.0,27.2,27.4,28.6,25.3,25.1,26.0,24.7,22.8,21.8,21.8,20.3,23.2,20.8,22.6,17.5,19.6,16.0,19.6,15.6,15.1,16.6,17.4,17.8],
      tempMax: [30.8,31.7,31.8,30.6,29.6,29.6,31.1,32.0,32.1,33.2,29.3,29.7,30.1,27.8,26.6,24.6,25.5,25.1,27.7,25.4,27.2,22.3,23.5,20.4,23.3,20.0,18.6,22.8,22.4,25.1],
      umidMin: [50.5,39.7,47.2,60.1,62.5,63.1,56.6,57.8,52.2,39.2,54.1,50.1,57.4,63.4,57.5,73.3,66.1,56.3,53.5,56.0,56.0,52.4,71.7,58.9,64.2,57.8,63.3,49.4,49.4,44.3],
      umidMed: [69.0,59.0,61.9,76.9,79.7,79.4,71.3,76.9,69.8,57.0,72.3,66.6,73.7,78.7,70.3,86.7,80.6,74.4,70.7,68.9,75.3,68.0,84.0,75.6,77.9,76.0,74.5,72.1,65.9,68.2],
      umidMax: [85.5,80.3,76.9,90.7,95.6,91.8,85.6,91.4,82.1,71.5,87.2,80.6,85.4,91.3,83.8,95.4,91.5,86.3,81.7,78.1,86.8,81.3,92.9,86.1,87.2,88.2,83.2,87.0,78.2,83.4],
      favoravelVetor: ["Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Sim","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não","Não"],
    },
  },
};

export const getYearData = (year: number): YearData | undefined => {
  return epidemiologicalData[year];
};

export const getAllYears = (): number[] => {
  return Object.keys(epidemiologicalData).map(Number).sort();
};

export const compareYears = (year1: number, year2: number) => {
  const data1 = getYearData(year1);
  const data2 = getYearData(year2);

  if (!data1 || !data2) return null;

  return {
    cases: {
      year1: data1.indicadores.confirmados,
      year2: data2.indicadores.confirmados,
      change: ((data2.indicadores.confirmados - data1.indicadores.confirmados) / data1.indicadores.confirmados) * 100,
    },
    attackRate: {
      year1: data1.indicadores.taxaAtaque,
      year2: data2.indicadores.taxaAtaque,
      change: ((data2.indicadores.taxaAtaque - data1.indicadores.taxaAtaque) / data1.indicadores.taxaAtaque) * 100,
    },
    cost: {
      year1: data1.impactoEconomico.total,
      year2: data2.impactoEconomico.total,
      change: ((data2.impactoEconomico.total - data1.impactoEconomico.total) / data1.impactoEconomico.total) * 100,
    },
  };
};
