# Exchange Desk — Currency Converter

A small React + Vite currency converter with 4 pages: Convert, Rates,
History, and About. This is the **frontend-only** milestone: the UI,
routing, and state are done, but exchange rates are mock data. Live
rates/backend come in the next session.

## Stack

- React 19 + Vite
- React Router for the 4 pages
- Plain CSS (no framework) — theme in `src/index.css`
- No backend yet — see "Adding the API" below

## Pages

- **Convert** (`/`) — the main converter, with a "Save to history" action
- **Rates** (`/rates`) — full table of one base currency against every supported currency
- **History** (`/history`) — past saved conversions (stored in `localStorage` for now)
- **About** (`/about`) — what the app does and the plan for the backend

## Running it

```bash
npm install
npm run dev
```

## Project structure

```
src/
  pages/               One file per route: Home, Rates, History, About
  components/
    layout/
      Layout.jsx        Shared header/nav/footer, renders the active page via <Outlet />
      Nav.jsx           Tab navigation between the 4 pages
    ConverterCard.jsx    Amount + currency selects + result (used on Home)
    CurrencySelect.jsx
    SwapButton.jsx
    RateTicker.jsx
  hooks/
    useConverter.js      All conversion state/logic, calls the service layer only
  services/
    currencyApi.js       Rates/conversion — currently mock data.
                          The ONLY file to change to go live with a real API.
    historyApi.js        Conversion history — currently localStorage.
                          Swap for real API calls once a backend exists.
  data/
    currencies.js         Static currency list + mock exchange rates
  App.jsx                 Route definitions
  main.jsx                Wraps App in BrowserRouter
  index.css
.env.example              Copy to .env once real API keys/URLs are needed
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
