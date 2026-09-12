import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-mark">⇄</span>
        <div>
          <h1>Exchange Desk</h1>
          <p className="app-subtitle">A quiet corner to check what your money is worth elsewhere.</p>
        </div>
      </header>

      <Nav />

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>Frontend build — rates are mock data until the API is connected.</span>
      </footer>
    </div>
  );
}
