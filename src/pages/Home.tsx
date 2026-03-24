import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";
import { listarDadosMeteorologicos } from "../service/dadosMeteorologicosService";

import sol from "../assets/weather/sol.png";
import solcomchuva from "../assets/weather/solcomchuva.png";
import solcomnuvem from "../assets/weather/solcomnuvem.png";
import nubladochuva from "../assets/weather/nubladochuva.png";
import nublado1 from "../assets/weather/nublado1.png";
import nublado2 from "../assets/weather/nublado2.png";
import tempestade from "../assets/weather/tempestade.png";

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

  // 🔥 NORMALIZAÇÃO FORTE (resolve TODOS os casos)
  const normalizarTexto = (valor: unknown) => {
    return String(valor ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  };

  const obterIconeClima = (tempo?: unknown) => {
    const valor = normalizarTexto(tempo);

    if (!valor) return nublado1;

    if (valor.includes("tempestade")) return tempestade;

    if (valor.includes("chuva") && valor.includes("noite")) return nubladochuva;

    if (valor.includes("chuva")) return solcomchuva;

    if (valor.includes("sol") && valor.includes("nuvem")) return solcomnuvem;

    if (valor.includes("sol") || valor.includes("ensolarado")) return sol;

    if (valor.includes("nublado") && valor.includes("noite")) return nublado2;

    if (valor.includes("nublado")) return nublado1;

    return nublado1;
  };

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
              <img
                src={obterIconeClima(destaque.tempoDia)}
                className="main-weather-icon"
              />

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
                <img
                  src={obterIconeClima(item.tempoDia)}
                  className="day-weather-icon"
                />
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