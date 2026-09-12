# Exchange Desk — Currency Converter

A small React + Vite currency converter. This is the **frontend-only** milestone:
the UI, state, and layout are done, but exchange rates are mock data. Live
rates/backend come in the next session.

## Stack

- React 19 + Vite
- Plain CSS (no framework) — theme in `src/index.css`
- No backend yet — see "Adding the API" below

## Running it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/        UI pieces (ConverterCard, CurrencySelect, SwapButton, RateTicker)
  hooks/
    useConverter.js   All conversion state/logic, calls the service layer only
  services/
    currencyApi.js    Service layer — currently returns mock data.
                       This is the ONLY file that needs to change to go live.
  data/
    currencies.js     Static currency list + mock exchange rates
  App.jsx
  index.css
.env.example           Copy to .env once real API keys/URLs are needed
```

The split between `hooks/` and `services/` is deliberate: components call the
hook, the hook calls the service, and the service is the single seam where
real network calls will get plugged in. Nothing else should need to change.

## Adding the API (next session)

Planned options, cheapest-to-wire-up first:

1. **Frankfurter** (`https://api.frankfurter.app`) — no key needed, good default.
2. **ExchangeRate-API** — needs a free key (put it in `.env` as
   `VITE_CURRENCY_API_KEY`), more currency coverage.
3. **Our own backend** — a small Express server that itself calls one of the
   above, and exposes `/rates` to the frontend (useful if we want to cache
   requests, hide a key, or add features like conversion history). If we go
   this route, point `VITE_API_BASE_URL` at it.

To wire in a real provider, edit only `src/services/currencyApi.js`:
replace the mock lookup in `getExchangeRates()` with a `fetch()` call to the
chosen endpoint, keeping the same return shape (`{ base, date, rates }`) so
`useConverter` and the UI don't need any changes.
