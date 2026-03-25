export type DadosMeteorologicos = {
  id: number;
  cidade: string;
  dataPrevisao: string;
  tempoDia: string;
  tempoNoite: string;
  temperaturaMaxima: number;
  temperaturaMinima: number;
  precipitacao: number;
  humidade: number;
  velocidadeVento: number;
};