import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";

function Home() {
  const [dados, setDados] = useState<DadosMeteorologicos[]>([]);

  useEffect(() => {
    api.get("/dados-meteorologicos?pagina=0&tamanho=10")
      .then((res) => {
        setDados(res.data.content ?? []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: "24px", color: "white" }}>
      <h1>Dados Meteorológicos</h1>

      {dados.length === 0 ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        dados.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#1e1e1e",
            }}
          >
            <h2>{item.cidade}</h2>
            <p><strong>Data:</strong> {item.dataPrevisao}</p>
            <p><strong>Tempo dia:</strong> {item.tempoDia}</p>
            <p><strong>Tempo noite:</strong> {item.tempoNoite}</p>
            <p><strong>Temperatura máxima:</strong> {item.temperaturaMaxima}°C</p>
            <p><strong>Temperatura mínima:</strong> {item.temperaturaMinima}°C</p>
            <p><strong>Precipitação:</strong> {item.precipitacao}</p>
            <p><strong>Humidade:</strong> {item.humidade}</p>
            <p><strong>Velocidade do vento:</strong> {item.velocidadeVento}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;