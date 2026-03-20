import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  atualizarDadosMeteorologicos,
  buscarDadosMeteorologicosPorId,
  cadastrarDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";

function CadastrarDadosMeteorologicos() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    if (id) {
      buscarDadosMeteorologicosPorId(Number(id))
        .then((dados) => {
          setForm({
            cidade: dados.cidade,
            dataPrevisao: dados.dataPrevisao,
            tempoDia: dados.tempoDia,
            tempoNoite: dados.tempoNoite,
            temperaturaMaxima: dados.temperaturaMaxima,
            temperaturaMinima: dados.temperaturaMinima,
            precipitacao: dados.precipitacao,
            humidade: dados.humidade,
            velocidadeVento: dados.velocidadeVento,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

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
      if (id) {
        await atualizarDadosMeteorologicos(Number(id), form);
        setMensagem("Dados atualizados com sucesso.");
      } else {
        await cadastrarDadosMeteorologicos(form);
        setMensagem("Dados cadastrados com sucesso.");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao salvar os dados.");
    }
  };

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>{id ? "Editar Dados Meteorológicos" : "Cadastrar Dados Meteorológicos"}</h1>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "400px",
        }}
      >
        <input
          name="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
        />
        <input
          name="dataPrevisao"
          type="date"
          value={form.dataPrevisao}
          onChange={handleChange}
        />
        <input
          name="tempoDia"
          placeholder="Tempo do dia"
          value={form.tempoDia}
          onChange={handleChange}
        />
        <input
          name="tempoNoite"
          placeholder="Tempo da noite"
          value={form.tempoNoite}
          onChange={handleChange}
        />
        <input
          name="temperaturaMaxima"
          type="number"
          placeholder="Temperatura máxima"
          value={form.temperaturaMaxima}
          onChange={handleChange}
        />
        <input
          name="temperaturaMinima"
          type="number"
          placeholder="Temperatura mínima"
          value={form.temperaturaMinima}
          onChange={handleChange}
        />
        <input
          name="precipitacao"
          type="number"
          placeholder="Precipitação"
          value={form.precipitacao}
          onChange={handleChange}
        />
        <input
          name="humidade"
          type="number"
          placeholder="Humidade"
          value={form.humidade}
          onChange={handleChange}
        />
        <input
          name="velocidadeVento"
          type="number"
          placeholder="Velocidade do vento"
          value={form.velocidadeVento}
          onChange={handleChange}
        />

        <button type="submit">{id ? "Salvar Alterações" : "Cadastrar"}</button>
      </form>

      {mensagem && <p style={{ marginTop: "16px" }}>{mensagem}</p>}
    </div>
  );
}

export default CadastrarDadosMeteorologicos;