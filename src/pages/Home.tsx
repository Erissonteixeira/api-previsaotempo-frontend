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
      .catch((err: unknown) => {
        console.error(err);
        setDados([]);
      });
  }, []);

  const dadosFiltrados = useMemo(() => {
    if (!busca.trim()) return dados;
    return dados.filter((item) =>
      item.cidade.toLowerCase().includes(busca.toLowerCase())
    );
  }, [dados, busca]);

  const destaque = dadosFiltrados[0];
  const proximosDias = dadosFiltrados.slice(0, 7);

  const obterIconeClima = (tempo?: string) => {
    if (!tempo) return "☁️";

    const valor = tempo.toLowerCase();

    if (valor.includes("sol") || valor.includes("ensolarado")) return "☀️";
    if (valor.includes("chuva")) return "🌧️";
    if (valor.includes("tempestade")) return "⛈️";
    if (valor.includes("nublado")) return "☁️";
    if (valor.includes("parcial")) return "🌤️";

    return "☁️";
  };

  return (
    <Layout>
      <section className="weather-home">
        <div className="weather-search">
          <input
            type="text"
            placeholder="Buscar cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {destaque ? (
          <>
            <section className="hero-weather-card">
              <div className="hero-left">
                <p className="hero-date">{destaque.dataPrevisao}</p>
                <h1 className="hero-city">{destaque.cidade}</h1>

                <div className="hero-temp-block">
                  <span className="hero-icon">
                    {obterIconeClima(destaque.tempoDia)}
                  </span>

                  <div>
                    <h2 className="hero-temp">{destaque.temperaturaMaxima}°C</h2>
                    <p className="hero-climate">{destaque.tempoDia}</p>
                  </div>
                </div>
              </div>

              <div className="hero-right">
                <div className="hero-info-box">
                  <div className="hero-info-row">
                    <span>Tempo noite</span>
                    <strong>{destaque.tempoNoite}</strong>
                  </div>
                  <div className="hero-info-row">
                    <span>Mínima</span>
                    <strong>{destaque.temperaturaMinima}°C</strong>
                  </div>
                  <div className="hero-info-row">
                    <span>Precipitação</span>
                    <strong>{destaque.precipitacao}</strong>
                  </div>
                  <div className="hero-info-row">
                    <span>Humidade</span>
                    <strong>{destaque.humidade}</strong>
                  </div>
                  <div className="hero-info-row">
                    <span>Vento</span>
                    <strong>{destaque.velocidadeVento}</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="forecast-section">
              <div className="forecast-header">
                <h2 className="forecast-title">Próximos 7 dias</h2>
              </div>

              <div className="forecast-grid">
                {proximosDias.map((item) => (
                  <div className="forecast-card" key={item.id}>
                    <p className="forecast-date">{item.dataPrevisao}</p>
                    <div className="forecast-icon">
                      {obterIconeClima(item.tempoDia)}
                    </div>
                    <h3 className="forecast-city">{item.cidade}</h3>
                    <p className="forecast-climate">{item.tempoDia}</p>
                    <p className="forecast-temp">
                      {item.temperaturaMaxima}° / {item.temperaturaMinima}°
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="card-section">
            <p className="empty-text">Nenhum dado encontrado.</p>
          </section>
        )}
      </section>
    </Layout>
  );
}

export default Home;