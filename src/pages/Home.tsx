import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";
import {
  listarDadosMeteorologicos,
  excluirDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";

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
    <div style={{ padding: "24px", color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Dados Meteorológicos</h1>
        <button onClick={() => navigate("/cadastrar")}>Novo Cadastro</button>
      </div>

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                gap: "16px",
              }}
            >
              <div>
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

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button onClick={() => navigate(`/editar/${item.id}`)}>Editar</button>
                <button onClick={() => handleExcluir(item.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;