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
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao salvar os dados.");
    }
  };

  return (
    <Layout>
      <section className="page-header">
        <h1 className="page-title">
          {id ? "Cadastro Metereológico" : "Cadastro Metereológico"}
        </h1>
      </section>

      <section className="form-card">
        <form onSubmit={handleSubmit} className="weather-form">
          <div className="form-grid top-grid">
            <div className="form-group">
              <label>Cidade</label>
              <input
                name="cidade"
                placeholder="Cidade"
                value={form.cidade}
                onChange={handleChange}
              />
            </div>

            <div className="form-group small">
              <label>Data</label>
              <input
                name="dataPrevisao"
                type="date"
                value={form.dataPrevisao}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-panel">
            <div className="form-grid bottom-grid">
              <div className="form-group">
                <label>Tempo do dia</label>
                <input
                  name="tempoDia"
                  placeholder="Tempo do dia"
                  value={form.tempoDia}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Tempo da noite</label>
                <input
                  name="tempoNoite"
                  placeholder="Tempo da noite"
                  value={form.tempoNoite}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Temperatura Máxima</label>
                <input
                  name="temperaturaMaxima"
                  type="number"
                  value={form.temperaturaMaxima}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Temperatura Mínima</label>
                <input
                  name="temperaturaMinima"
                  type="number"
                  value={form.temperaturaMinima}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Precipitação</label>
                <input
                  name="precipitacao"
                  type="number"
                  value={form.precipitacao}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Humidade</label>
                <input
                  name="humidade"
                  type="number"
                  value={form.humidade}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Velocidade do vento</label>
                <input
                  name="velocidadeVento"
                  type="number"
                  value={form.velocidadeVento}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button type="submit" className="primary-button">
              {id ? "Salvar" : "Salvar"}
            </button>
          </div>

          {mensagem && <p className="feedback-text">{mensagem}</p>}
        </form>
      </section>
    </Layout>
  );
}

export default CadastrarDadosMeteorologicos;