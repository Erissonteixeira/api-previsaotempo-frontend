import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  atualizarDadosMeteorologicos,
  buscarDadosMeteorologicosPorId,
  cadastrarDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";
import Layout from "../components/Layout";

const TEMPOS = ["sol", "sol com nuvens", "chuva", "tempestade", "nublado"];
const TURNOS = ["manhã", "noite"];

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

  const [turnoSelecionado, setTurnoSelecionado] = useState<"manhã" | "noite">("manhã");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    if (id) {
      buscarDadosMeteorologicosPorId(Number(id)).then((dados) => {
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
      });
    }
  }, [id]);

  const selecionarTempo = (valor: string) => {
    if (turnoSelecionado === "manhã") {
      setForm((prev) => ({ ...prev, tempoDia: valor }));
    } else {
      setForm((prev) => ({ ...prev, tempoNoite: valor }));
    }
  };

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
    setMensagem("");

    try {
      if (id) {
        await atualizarDadosMeteorologicos(Number(id), form);
      } else {
        await cadastrarDadosMeteorologicos(form);
      }

      navigate("/listar");
    } catch {
      setMensagem("Erro ao salvar os dados.");
    }
  };

  return (
    <Layout>
      <div className="cadastro-wrapper">
        <h1 className="cadastro-title">Cadastro Metereológico</h1>

        <form onSubmit={handleSubmit} className="cadastro-card">
          <div className="cadastro-top">
            <div className="cadastro-top-field">
              <label htmlFor="cidade">Cidade</label>
              <input
                id="cidade"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                placeholder="Cidade"
              />
            </div>

            <div className="cadastro-top-field cadastro-top-date">
              <label htmlFor="dataPrevisao">Data</label>
              <input
                id="dataPrevisao"
                type="date"
                name="dataPrevisao"
                value={form.dataPrevisao}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="cadastro-panel-figma">
            <div className="cadastro-section">
              <label className="section-title">Tempo</label>
              <div className="chip-group">
                {TEMPOS.map((tempo) => {
                  const ativo =
                    (turnoSelecionado === "manhã" && form.tempoDia === tempo) ||
                    (turnoSelecionado === "noite" && form.tempoNoite === tempo);

                  return (
                    <button
                      type="button"
                      key={tempo}
                      className={`chip ${ativo ? "active" : ""}`}
                      onClick={() => selecionarTempo(tempo)}
                    >
                      {tempo}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="cadastro-section">
              <label className="section-title">Turno</label>
              <div className="chip-group">
                {TURNOS.map((turno) => (
                  <button
                    type="button"
                    key={turno}
                    className={`chip ${turnoSelecionado === turno ? "active" : ""}`}
                    onClick={() => setTurnoSelecionado(turno as "manhã" | "noite")}
                  >
                    {turno}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-numerico">
              <div className="grid-field">
                <label htmlFor="temperaturaMaxima">Temperatura Máxima</label>
                <input
                  id="temperaturaMaxima"
                  type="number"
                  name="temperaturaMaxima"
                  value={form.temperaturaMaxima}
                  onChange={handleChange}
                />
              </div>

              <div className="grid-field">
                <label htmlFor="temperaturaMinima">Temperatura Mínima</label>
                <input
                  id="temperaturaMinima"
                  type="number"
                  name="temperaturaMinima"
                  value={form.temperaturaMinima}
                  onChange={handleChange}
                />
              </div>

              <div className="grid-field">
                <label htmlFor="precipitacao">Precipitação</label>
                <input
                  id="precipitacao"
                  type="number"
                  name="precipitacao"
                  value={form.precipitacao}
                  onChange={handleChange}
                />
              </div>

              <div className="grid-field">
                <label htmlFor="humidade">Humidade</label>
                <input
                  id="humidade"
                  type="number"
                  name="humidade"
                  value={form.humidade}
                  onChange={handleChange}
                />
              </div>

              <div className="grid-field">
                <label htmlFor="velocidadeVento">Velocidade do vento</label>
                <input
                  id="velocidadeVento"
                  type="number"
                  name="velocidadeVento"
                  value={form.velocidadeVento}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="cadastro-actions">
            <button
              type="button"
              onClick={() => navigate("/listar")}
              className="secondary-button"
            >
              Cancelar
            </button>

            <button type="submit" className="primary-button">
              Salvar
            </button>
          </div>

          {mensagem && <p className="feedback-text">{mensagem}</p>}
        </form>
      </div>
    </Layout>
  );
}

export default CadastrarDadosMeteorologicos;