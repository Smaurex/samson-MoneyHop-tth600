// ---------------------------------------------------------------------------
// Currency API service layer.
//
// Nothing in this file makes a real network call yet — the app currently
// runs on the static data in `src/data/currencies.js`. This file exists so
// that when the backend is added next session, only THIS file needs to
// change: swap the mock implementation for a real fetch (either straight to
// a provider like Frankfurter, or to our own backend once it exists), and
// every component that calls getExchangeRates()/convertCurrency() keeps
// working without changes.
// ---------------------------------------------------------------------------

import { MOCK_RATES_BASE_USD } from "../data/currencies";

// Simulates network latency so loading states can be built/tested honestly.
const FAKE_LATENCY_MS = 400;

/**
 * Fetches exchange rates for a base currency.
 * TODO (next session): replace with a real call, e.g.
 *   const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/rates?base=${base}`);
 *   return res.json();
 *
 * @param {string} base - three-letter currency code, e.g. "USD"
 * @returns {Promise<{ base: string, date: string, rates: Record<string, number> }>}
 */
export async function getExchangeRates(base = "USD") {
  await wait(FAKE_LATENCY_MS);

  const baseRate = MOCK_RATES_BASE_USD[base];
  if (!baseRate) {
    throw new Error(`Unsupported currency: ${base}`);
  }

  // Re-derive every rate relative to the requested base.
  const rates = Object.fromEntries(
    Object.entries(MOCK_RATES_BASE_USD).map(([code, usdRate]) => [
      code,
      usdRate / baseRate,
    ])
  );

  return {
    base,
    date: new Date().toISOString().slice(0, 10),
    rates,
    source: "mock", // flips to "live" once the real API is connected
  };
}

/**
 * Converts an amount from one currency to another using current rates.
 * TODO (next session): this can stay client-side math against fetched rates,
 * or move server-side if we want the backend to own the calculation.
 *
 * @param {number} amount
 * @param {string} from
 * @param {string} to
 * @returns {Promise<number>}
 */
export async function convertCurrency(amount, from, to) {
  const { rates } = await getExchangeRates(from);
  const rate = rates[to];
  if (rate == null) {
    throw new Error(`No rate available for ${from} -> ${to}`);
  }
  return amount * rate;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
