// Static reference data used until the backend/API is wired up (next session).
// Shape mirrors what a real rates endpoint (e.g. Frankfurter) would return,
// so swapping the mock for a live call later is a drop-in change.

export const CURRENCIES = [
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "PHP", label: "Philippine Peso" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  { code: "SGD", label: "Singapore Dollar" },
  { code: "CHF", label: "Swiss Franc" },
  { code: "CNY", label: "Chinese Yuan" },
];

// Mock rates, all quoted against 1 USD. Placeholder values only.
export const MOCK_RATES_BASE_USD = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 147.35,
  PHP: 56.8,
  AUD: 1.52,
  CAD: 1.36,
  SGD: 1.31,
  CHF: 0.88,
  CNY: 7.12,
};

// A handful of pairs shown on the ticker strip.
export const TICKER_PAIRS = [
  ["USD", "EUR"],
  ["USD", "PHP"],
  ["USD", "JPY"],
  ["USD", "GBP"],
  ["EUR", "PHP"],
];
