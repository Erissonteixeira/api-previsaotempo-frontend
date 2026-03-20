import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CadastrarDadosMeteorologicos from "../pages/CadastrarDadosMeteorologicos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<CadastrarDadosMeteorologicos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;