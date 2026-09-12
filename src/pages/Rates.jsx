import { useEffect, useState } from "react";
import CurrencySelect from "../components/CurrencySelect";
import { CURRENCIES } from "../data/currencies";
import { getExchangeRates } from "../services/currencyApi";

export default function Rates() {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getExchangeRates(base)
      .then((data) => {
        if (cancelled) return;
        setRates(data);
        setStatus("done");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [base]);

  return (
    <section className="board">
      <div className="board-row">
        <CurrencySelect id="rates-base" label="Base currency" value={base} onChange={setBase} />
      </div>

      {status === "loading" && <p className="readout-status">loading rates…</p>}
      {status === "error" && <p className="readout-error">Couldn't load rates.</p>}

      {status === "done" && rates && (
        <table className="rates-table">
          <thead>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {CURRENCIES.filter((c) => c.code !== base).map((c) => (
              <tr key={c.code}>
                <td>
                  {c.code} <span className="muted">— {c.label}</span>
                </td>
                <td className="mono">{rates.rates[c.code]?.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="disclaimer">
        1 {base} converted to every supported currency. Placeholder rates for now.
      </p>
    </section>
  );
}
