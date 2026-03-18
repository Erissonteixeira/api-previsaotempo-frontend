import { useEffect, useState } from "react";
import { api } from "../api/api";

function Home() {
  const [dados, setDados] = useState<any[]>([]);

  useEffect(() => {
    api.get("/dados-meteorologicos?pagina=0&tamanho=10")
      .then((res: any) => {
        setDados(res.data.content ?? []);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Dados Meteorológicos</h1>

      {dados.map((item, index) => (
        <div key={index}>
          <p>{JSON.stringify(item)}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;