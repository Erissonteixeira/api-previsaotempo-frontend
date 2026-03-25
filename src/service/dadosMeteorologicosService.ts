import { api } from "../api/api";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";

export type DadosMeteorologicosRequest = Omit<DadosMeteorologicos, "id">;

export const listarDadosMeteorologicos = async (): Promise<DadosMeteorologicos[]> => {
  const response = await api.get("/dados-meteorologicos?pagina=0&tamanho=50");
  return response.data.content ?? [];
};

export const cadastrarDadosMeteorologicos = async (
  dados: DadosMeteorologicosRequest
): Promise<DadosMeteorologicos> => {
  const response = await api.post("/dados-meteorologicos", dados);
  return response.data;
};

export const excluirDadosMeteorologicos = async (id: number): Promise<void> => {
  await api.delete(`/dados-meteorologicos/${id}`);
};

export const buscarDadosMeteorologicosPorId = async (
  id: number
): Promise<DadosMeteorologicos> => {
  const response = await api.get(`/dados-meteorologicos/${id}`);
  return response.data;
};

export const atualizarDadosMeteorologicos = async (
  id: number,
  dados: DadosMeteorologicosRequest
): Promise<DadosMeteorologicos> => {
  const response = await api.put(`/dados-meteorologicos/${id}`, dados);
  return response.data;
};