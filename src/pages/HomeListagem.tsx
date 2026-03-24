import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DadosMeteorologicos } from "../types/DadosMeteorologicos";
import {
  listarDadosMeteorologicos,
  excluirDadosMeteorologicos,
} from "../service/dadosMeteorologicosService";
import Layout from "../components/Layout";

function HomeListagem() {
  const [dados, setDados] = useState<DadosMeteorologicos[]>([]);
  const [filtroCidade, setFiltroCidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const carregarDados = async () => {
    try {
      const res = await listarDadosMeteorologicos();
      setDados(res);

      if (res.length === 0) {
        setMensagem(
          "Nenhum dado encontrado. Cadastre registros com data de hoje em diante para aparecerem aqui."
        );
      } else {
        setMensagem("");
      }
    } catch (err) {
      console.error(err);
      setDados([]);
      setMensagem("Erro ao carregar os dados.");
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleExcluir = async (id: number) => {
    try {
      await excluirDadosMeteorologicos(id);
      await carregarDados();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao excluir o registro.");
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

        {mensagem && <p className="feedback-text">{mensagem}</p>}

        <div className="table-container">
          <div className="table-header">
            <span>Cidade</span>
            <span>Data</span>
            <span>Ação</span>
          </div>

          {dadosFiltrados.map((item) => (
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
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default HomeListagem;