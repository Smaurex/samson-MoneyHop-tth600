import ConverterCard from "./components/ConverterCard";
import RateTicker from "./components/RateTicker";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-mark">⇄</span>
        <div>
          <h1>Exchange Desk</h1>
          <p className="app-subtitle">A quiet corner to check what your money is worth elsewhere.</p>
        </div>
      </header>

      <main className="app-main">
        <ConverterCard />
        <RateTicker />
      </main>

      <footer className="app-footer">
        <span>Frontend build — rates are mock data until the API is connected.</span>
      </footer>
    </div>
  );
}
