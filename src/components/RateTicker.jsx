import { useEffect, useState } from "react";
import { TICKER_PAIRS } from "../data/currencies";
import { getExchangeRates } from "../services/currencyApi";

export default function RateTicker() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadTicker() {
      const bases = [...new Set(TICKER_PAIRS.map(([from]) => from))];
      const ratesByBase = {};
      for (const base of bases) {
        ratesByBase[base] = await getExchangeRates(base);
      }
      if (cancelled) return;
      setRows(
        TICKER_PAIRS.map(([from, to]) => ({
          from,
          to,
          rate: ratesByBase[from].rates[to],
        }))
      );
    }

    loadTicker();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="ticker">
      <span className="ticker-heading">Reference rates</span>
      <div className="ticker-rows">
        {rows.map((row) => (
          <div className="ticker-row" key={`${row.from}-${row.to}`}>
            <span className="ticker-pair">
              {row.from} / {row.to}
            </span>
            <span className="ticker-value">{row.rate.toFixed(4)}</span>
          </div>
        ))}
        {rows.length === 0 && <div className="ticker-row muted">loading…</div>}
      </div>
    </div>
  );
}
