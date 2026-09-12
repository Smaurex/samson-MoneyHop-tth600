import { useCallback, useEffect, useState } from "react";
import { convertCurrency } from "../services/currencyApi";

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
  };
}
