import { NavLink } from "react-router-dom";
import dbLogo from "../assets/weather/db.png";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-bg">
      <div className="app-shell">
        <header className="topbar">
          <nav className="topnav">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/cadastrar" className="nav-link">
              Cadastrar
            </NavLink>

            <NavLink to="/listar" className="nav-link">
              Listar
            </NavLink>
          </nav>
        </header>

        <main className="content">{children}</main>

        <footer className="footer-bar">
          <span>make with love</span>
          <img src={dbLogo} alt="db" className="footer-logo" />
        </footer>
      </div>
    </div>
  );
}

export default Layout;