import { useEffect, useState } from "react";
import { getHistory } from "../services/historyApi";

export default function History() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | done | error

  useEffect(() => {
    let cancelled = false;

    getHistory()
      .then((data) => {
        if (cancelled) return;
        setEntries(data);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="board">
      <div className="board-row history-heading-row">
        <h2 className="board-heading">Saved conversions</h2>
      </div>

      {status === "loading" && <p className="readout-status">loading history…</p>}

      {status === "error" && (
        <p className="readout-error">
          Couldn't reach the backend. Make sure the server in <code>backend/</code> is running
          on port 3000.
        </p>
      )}

      {status === "done" && entries.length === 0 && (
        <p className="readout-status">
          Nothing saved yet. Convert something on the Convert page and select "Save to history."
        </p>
      )}

      {status === "done" && entries.length > 0 && (
        <ul className="history-list">
          {entries.map((entry) => (
            <li className="history-item" key={entry.id}>
              <div className="history-line">
                <span className="mono">
                  {entry.amount.toLocaleString()} {entry.from}
                </span>
                <span className="muted">→</span>
                <span className="mono readout-value-inline">
                  {entry.result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {entry.to}
                </span>
              </div>
              <span className="history-date">
                {new Date(entry.at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="disclaimer">
        Loaded from the MySQL database via the backend.
      </p>
    </section>
  );
}
