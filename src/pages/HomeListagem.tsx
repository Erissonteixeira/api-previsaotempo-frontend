import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";
import { listarDadosMeteorologicos } from "../service/dadosMeteorologicosService";

function Home() {
  const [dados, setDados] = useState<DadosMeteorologicos[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    listarDadosMeteorologicos()
      .then((res: DadosMeteorologicos[]) => {
        setDados(res);
      })
      .catch(() => setDados([]));
  }, []);

  const dadosFiltrados = useMemo(() => {
    if (!busca.trim()) return dados;
    return dados.filter((item) =>
      item.cidade.toLowerCase().includes(busca.toLowerCase())
    );
  }, [dados, busca]);

  const destaque = dadosFiltrados[0];
  const proximosDias = dadosFiltrados.slice(0, 7);

  return (
    <Layout>
      <div className="home-wrapper">
        <div className="home-top">
          <h2>Hoje</h2>

          <div className="search-box">
            <label>Pesquise a cidade</label>
            <input
              type="text"
              placeholder="Buscar cidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        {destaque && (
          <div className="main-weather-card">
            <div className="main-left">
              <div className="big-icon">☁️</div>

              <div className="main-temp">
                <h1>{destaque.temperaturaMaxima}°</h1>
                <span>{destaque.temperaturaMinima}°</span>
              </div>
            </div>

            <div className="main-right">
              <div className="info-item">
                <span>🌂</span>
                <p>{destaque.precipitacao}%</p>
                <small>Precipitação</small>
              </div>

              <div className="info-item">
                <span>💧</span>
                <p>{destaque.humidade}%</p>
                <small>Humidade</small>
              </div>

              <div className="info-item">
                <span>🌬️</span>
                <p>{destaque.velocidadeVento}km/h</p>
                <small>Vento</small>
              </div>
            </div>
          </div>
        )}

        <div className="days-list">
          {proximosDias.map((item) => (
            <div key={item.id} className="day-row">
              <div className="day-date">{item.dataPrevisao}</div>

              <div className="day-climate">
                <span className="icon">☀️</span>
                <span>{item.tempoDia}</span>
              </div>

              <div className="day-temp">
                <strong>+{item.temperaturaMaxima}</strong>
                <span>+{item.temperaturaMinima}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Home;