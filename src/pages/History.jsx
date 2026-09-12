import { useEffect, useState } from "react";
import { getHistory, clearHistory } from "../services/historyApi";

export default function History() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getHistory());
  }, []);

  const handleClear = () => {
    clearHistory();
    setEntries([]);
  };

  return (
    <section className="board">
      <div className="board-row history-heading-row">
        <h2 className="board-heading">Saved conversions</h2>
        {entries.length > 0 && (
          <button type="button" className="text-button" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="readout-status">
          Nothing saved yet. Convert something on the Convert page and select "Save to history."
        </p>
      ) : (
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
        Stored on this device only for now. Once the backend is connected, history can sync across devices.
      </p>
    </section>
  );
}
