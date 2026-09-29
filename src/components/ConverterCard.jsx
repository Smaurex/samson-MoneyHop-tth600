import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import SwapButton from "./SwapButton";
import { useConverter } from "../hooks/useConverter";

export default function ConverterCard() {
  const {
    amount,
    setAmount,
    from,
    setFrom,
    to,
    setTo,
    result,
    status,
    error,
    swap,
    saveToHistory,
  } = useConverter();
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const entry = await saveToHistory();
      if (entry) {
        setSaved(true);
        setTimeout(() => setSaved(false), 1600);
      }
    } catch (err) {
      setSaveError(err.message ?? "Could not save. Is the backend running?");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="board">
      <div className="board-row">
        <label className="field amount-field" htmlFor="amount">
          <span className="field-label">Amount</span>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0"
            className="field-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>

      <div className="board-row currencies-row">
        <CurrencySelect id="from" label="From" value={from} onChange={setFrom} />
        <SwapButton onClick={swap} />
        <CurrencySelect id="to" label="To" value={to} onChange={setTo} />
      </div>

      <div className="readout" aria-live="polite">
        {status === "loading" && <span className="readout-status">converting…</span>}
        {status === "error" && <span className="readout-error">{error}</span>}
        {status === "done" && result !== null && (
          <>
            <span className="readout-value">
              {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className="readout-currency">{to}</span>
            <button
              type="button"
              className="save-button"
              onClick={handleSave}
              disabled={saved || saving}
            >
              {saved ? "Saved" : saving ? "Saving…" : "Save to history"}
            </button>
          </>
        )}
      </div>

      {saveError && <p className="readout-error">{saveError}</p>}

      <p className="disclaimer">
        Rates shown are placeholder values for development. Live rates connect next session.
      </p>
    </section>
  );
}
