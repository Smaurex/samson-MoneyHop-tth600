import { useCallback, useEffect, useState } from "react";
import { convertCurrency } from "../services/currencyApi";
import { addHistoryEntry } from "../services/historyApi";

/**
 * Owns all the state for the converter: amount, currency pair, result,
 * loading/error status. Talks to the service layer only — never touches
 * the mock data directly — so this hook won't need to change when the
 * service starts making real network calls.
 */
export function useConverter({ initialFrom = "USD", initialTo = "PHP", initialAmount = 100 } = {}) {
  const [amount, setAmount] = useState(initialAmount);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | error | done
  const [error, setError] = useState(null);

  const runConversion = useCallback(async () => {
    if (!amount || Number.isNaN(Number(amount))) {
      setResult(null);
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const value = await convertCurrency(Number(amount), from, to);
      setResult(value);
      setStatus("done");
    } catch (err) {
      setError(err.message ?? "Something went wrong.");
      setStatus("error");
    }
  }, [amount, from, to]);

  useEffect(() => {
    runConversion();
  }, [runConversion]);

  const swap = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [from, to]);

  // Saves the currently displayed result to history. Kept as an explicit,
  // user-triggered action (rather than firing on every keystroke) so the
  // history list stays meaningful instead of filling with in-progress typing.
  const saveToHistory = useCallback(async () => {
    if (status !== "done" || result === null) return null;
    return addHistoryEntry({ amount: Number(amount), from, to, result });
  }, [status, result, amount, from, to]);

  return {
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
  };
}
