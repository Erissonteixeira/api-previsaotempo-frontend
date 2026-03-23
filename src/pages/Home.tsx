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
  const [filtroCidade, setFiltroCidade] = useState("");
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

  const dadosFiltrados = dados.filter((item) =>
    item.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
  );

  return (
    <Layout>
      <section className="page-header">
        <h1 className="page-title">Lista de cidades</h1>

        <button
          className="primary-button"
          onClick={() => navigate("/cadastrar")}
        >
          Novo Cadastro
        </button>
      </section>

      <section className="card-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar cidade..."
            value={filtroCidade}
            onChange={(e) => setFiltroCidade(e.target.value)}
          />
        </div>

        <div className="table-container">
          <div className="table-header">
            <span>Cidade</span>
            <span>Data</span>
            <span>Ação</span>
          </div>

          {dadosFiltrados.length === 0 ? (
            <p className="empty-text">Nenhum dado encontrado.</p>
          ) : (
            dadosFiltrados.map((item) => (
              <div className="table-row" key={item.id}>
                <span>{item.cidade}</span>
                <span>{item.dataPrevisao}</span>

                <div className="table-actions">
                  <button
                    className="icon-button edit"
                    onClick={() => navigate(`/editar/${item.id}`)}
                    title="Editar"
                  >
                    ✏️
                  </button>

                  <button
                    className="icon-button delete"
                    onClick={() => handleExcluir(item.id)}
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Home;