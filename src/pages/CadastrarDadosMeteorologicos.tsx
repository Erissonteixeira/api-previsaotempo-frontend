import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  atualizarDadosMeteorologicos,
  buscarDadosMeteorologicosPorId,
  cadastrarDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";
import Layout from "../components/Layout";

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
        navigate("/listar");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao salvar os dados.");
    }
  };

  return (
    <Layout>
      <section className="cadastro-wrapper">
        <h1 className="cadastro-title">Cadastro Metereológico</h1>

        <div className="cadastro-card">
          <form onSubmit={handleSubmit} className="cadastro-form">
            <div className="cadastro-row cadastro-row-top">
              <div className="cadastro-field">
                <label htmlFor="cidade">Cidade</label>
                <input
                  id="cidade"
                  name="cidade"
                  placeholder="Cidade"
                  value={form.cidade}
                  onChange={handleChange}
                />
              </div>

              <div className="cadastro-field cadastro-field-small">
                <label htmlFor="dataPrevisao">Data</label>
                <input
                  id="dataPrevisao"
                  name="dataPrevisao"
                  type="date"
                  value={form.dataPrevisao}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="cadastro-panel">
              <div className="cadastro-grid">
                <div className="cadastro-field">
                  <label htmlFor="tempoDia">Tempo do dia</label>
                  <input
                    id="tempoDia"
                    name="tempoDia"
                    placeholder="Tempo do dia"
                    value={form.tempoDia}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="tempoNoite">Tempo da noite</label>
                  <input
                    id="tempoNoite"
                    name="tempoNoite"
                    placeholder="Tempo da noite"
                    value={form.tempoNoite}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="temperaturaMaxima">Temperatura Máxima</label>
                  <input
                    id="temperaturaMaxima"
                    name="temperaturaMaxima"
                    type="number"
                    value={form.temperaturaMaxima}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="temperaturaMinima">Temperatura Mínima</label>
                  <input
                    id="temperaturaMinima"
                    name="temperaturaMinima"
                    type="number"
                    value={form.temperaturaMinima}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="precipitacao">Precipitação</label>
                  <input
                    id="precipitacao"
                    name="precipitacao"
                    type="number"
                    value={form.precipitacao}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="humidade">Humidade</label>
                  <input
                    id="humidade"
                    name="humidade"
                    type="number"
                    value={form.humidade}
                    onChange={handleChange}
                  />
                </div>

                <div className="cadastro-field">
                  <label htmlFor="velocidadeVento">Velocidade do vento</label>
                  <input
                    id="velocidadeVento"
                    name="velocidadeVento"
                    type="number"
                    value={form.velocidadeVento}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="cadastro-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/listar")}
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
      </section>
    </Layout>
  );
}

export default CadastrarDadosMeteorologicos;