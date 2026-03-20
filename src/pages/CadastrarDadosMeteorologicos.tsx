import { useState } from "react";
import { cadastrarDadosMeteorologicos } from "../service/dadosMeteorologicosService";

function CadastrarDadosMeteorologicos() {
  const [form, setForm] = useState({
    cidade: "",
    dataPrevisao: "",
    tempoDia: "",
    tempoNoite: "",
    temperaturaMaxima: 0,
    temperaturaMinima: 0,
    precipitacao: 0,
    humidade: 0,
    velocidadeVento: 0,
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "temperaturaMaxima" ||
        name === "temperaturaMinima" ||
        name === "precipitacao" ||
        name === "humidade" ||
        name === "velocidadeVento"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await cadastrarDadosMeteorologicos(form);
      setMensagem("Dados cadastrados com sucesso.");

      setForm({
        cidade: "",
        dataPrevisao: "",
        tempoDia: "",
        tempoNoite: "",
        temperaturaMaxima: 0,
        temperaturaMinima: 0,
        precipitacao: 0,
        humidade: 0,
        velocidadeVento: 0,
      });
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao cadastrar os dados.");
    }
  };

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <h1>Cadastrar Dados Meteorológicos</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}
      >
        <input name="cidade" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
        <input name="dataPrevisao" type="date" value={form.dataPrevisao} onChange={handleChange} />
        <input name="tempoDia" placeholder="Tempo do dia" value={form.tempoDia} onChange={handleChange} />
        <input name="tempoNoite" placeholder="Tempo da noite" value={form.tempoNoite} onChange={handleChange} />
        <input name="temperaturaMaxima" type="number" placeholder="Temperatura máxima" value={form.temperaturaMaxima} onChange={handleChange} />
        <input name="temperaturaMinima" type="number" placeholder="Temperatura mínima" value={form.temperaturaMinima} onChange={handleChange} />
        <input name="precipitacao" type="number" placeholder="Precipitação" value={form.precipitacao} onChange={handleChange} />
        <input name="humidade" type="number" placeholder="Humidade" value={form.humidade} onChange={handleChange} />
        <input name="velocidadeVento" type="number" placeholder="Velocidade do vento" value={form.velocidadeVento} onChange={handleChange} />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p style={{ marginTop: "16px" }}>{mensagem}</p>}
    </div>
  );
}

export default CadastrarDadosMeteorologicos;