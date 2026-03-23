import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isListPage = location.pathname === "/" || location.pathname === "/listar";

  return (
    <div className="app-bg">
      <div className="app-shell">
        <header className="topbar">
          <nav className="topnav">
            <Link className={location.pathname === "/" ? "nav-link active" : "nav-link"} to="/">
              Home
            </Link>

            <Link
              className={location.pathname.startsWith("/cadastrar") ? "nav-link active" : "nav-link"}
              to="/cadastrar"
            >
              Cadastrar
            </Link>

            <Link className={isListPage ? "nav-link active" : "nav-link"} to="/">
              Listar
            </Link>
          </nav>
        </header>

        <main className="content">{children}</main>

        <footer className="footer-bar">
          <span>make with love</span>
        </footer>
      </div>
    </div>
  );
}

export default Layout;