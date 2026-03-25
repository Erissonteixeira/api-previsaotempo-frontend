import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import HomeListagem from "../pages/HomeListagem";
import CadastrarDadosMeteorologicos from "../pages/CadastrarDadosMeteorologicos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listar" element={<HomeListagem />} />
        <Route path="/cadastrar" element={<CadastrarDadosMeteorologicos />} />
        <Route path="/editar/:id" element={<CadastrarDadosMeteorologicos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;