import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/cadastrar" && location.pathname.startsWith("/cadastrar")) return true;
    if (path === "/listar" && location.pathname.startsWith("/listar")) return true;
    return false;
  };

  return (
    <div className="app-bg">
      <div className="app-shell">
        <header className="topbar">
          <nav className="topnav">
            <Link className={isActive("/") ? "nav-link active" : "nav-link"} to="/">
              Home
            </Link>
            <Link
              className={isActive("/cadastrar") ? "nav-link active" : "nav-link"}
              to="/cadastrar"
            >
              Cadastrar
            </Link>
            <Link
              className={isActive("/listar") ? "nav-link active" : "nav-link"}
              to="/listar"
            >
              Listar
            </Link>
          </nav>
        </header>

        <main className="content">{children}</main>

        <footer className="footer-bar">
          <span>weather app</span>
        </footer>
      </div>
    </div>
  );
}

export default Layout;