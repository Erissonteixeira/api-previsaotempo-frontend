import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";
import {
  listarDadosMeteorologicos,
  excluirDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";
import Layout from "../components/Layout";

function Home() {
  const [dados, setDados] = useState<DadosMeteorologicos[]>([]);
  const navigate = useNavigate();

  const carregarDados = () => {
    listarDadosMeteorologicos()
      .then((res: DadosMeteorologicos[]) => {
        setDados(res);
      })
      .catch((err: unknown) => {
        console.error(err);
        setDados([]);
      });
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleExcluir = async (id: number) => {
    try {
      await excluirDadosMeteorologicos(id);
      carregarDados();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <section className="page-header">
        <h1 className="page-title">Lista de cidades</h1>

        <div className="page-actions">
          <button className="primary-button" onClick={() => navigate("/cadastrar")}>
            Novo Cadastro
          </button>
        </div>
      </section>

      <section className="card-section">
        {dados.length === 0 ? (
          <p className="empty-text">Nenhum dado encontrado.</p>
        ) : (
          <div className="weather-list">
            {dados.map((item) => (
              <div className="weather-card" key={item.id}>
                <div className="weather-card-content">
                  <div className="weather-main-info">
                    <h2>{item.cidade}</h2>
                    <p>
                      <strong>Data:</strong> {item.dataPrevisao}
                    </p>
                    <p>
                      <strong>Tempo dia:</strong> {item.tempoDia}
                    </p>
                    <p>
                      <strong>Tempo noite:</strong> {item.tempoNoite}
                    </p>
                    <p>
                      <strong>Temperatura máxima:</strong> {item.temperaturaMaxima}°C
                    </p>
                    <p>
                      <strong>Temperatura mínima:</strong> {item.temperaturaMinima}°C
                    </p>
                    <p>
                      <strong>Precipitação:</strong> {item.precipitacao}
                    </p>
                    <p>
                      <strong>Humidade:</strong> {item.humidade}
                    </p>
                    <p>
                      <strong>Velocidade do vento:</strong> {item.velocidadeVento}
                    </p>
                  </div>

                  <div className="weather-card-actions">
                    <button
                      className="secondary-button"
                      onClick={() => navigate(`/editar/${item.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="danger-button"
                      onClick={() => handleExcluir(item.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Home;