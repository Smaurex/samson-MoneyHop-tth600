# Exchange Desk — Currency Converter

A small React + Vite currency converter with 4 pages: Convert, Rates,
History, and About. History is now backed by a real Express + MySQL API.
Exchange rates themselves are still mock data (that's next).

## Stack

- **Frontend:** React 19 + Vite, React Router, plain CSS (`src/index.css`)
- **Backend:** Express + `mysql2`, in `backend/` — GET and POST only for now
- **Database:** MySQL (tested against MariaDB via phpMyAdmin/XAMPP-style setups)

## Pages

- **Convert** (`/`) — the main converter, with a "Save to history" action
- **Rates** (`/rates`) — full table of one base currency against every supported currency (still mock rates)
- **History** (`/history`) — past saved conversions, loaded from the database
- **About** (`/about`) — what the app does and what's next

## Setup

### 1. Database

Import `backend/db/exchange_desk_db.sql` (e.g. in phpMyAdmin, or via the
`mysql` CLI):

```bash
mysql -u root -p < backend/db/exchange_desk_db.sql
```

This creates the `exchange_desk_db` database and its one table,
`conversions`.

### 2. Backend

```bash
cd backend
npm install
npm start
```

Runs on `http://localhost:3000`. Edit the `db` connection block at the top
of `backend/server.js` if your MySQL user/password differ from the default
(`root` / no password).

### 3. Frontend

From the project root:

```bash
npm install
npm run dev
```

`.env` already points `VITE_API_BASE_URL` at `http://localhost:3000/api` —
edit it if the backend runs elsewhere.

Both the backend and the frontend dev server need to be running at the same
time for History to load and for "Save to history" to work.

## Project structure

```
backend/
  server.js               Express app — GET/POST /api/conversions only
  package.json
  db/
    exchange_desk_db.sql   Schema for the `conversions` table

src/
  pages/                  One file per route: Home, Rates, History, About
  components/
    layout/
      Layout.jsx           Shared header/nav/footer, renders the active page via <Outlet />
      Nav.jsx              Tab navigation between the 4 pages
    ConverterCard.jsx       Amount + currency selects + result (used on Home)
    CurrencySelect.jsx
    SwapButton.jsx
    RateTicker.jsx
  hooks/
    useConverter.js         All conversion state/logic, calls the service layer only
  services/
    currencyApi.js          Rates/conversion — still mock data.
                             The file to change to go live with a real rates API.
    historyApi.js            Conversion history — now calls the real backend above.
  data/
    currencies.js            Static currency list + mock exchange rates
  App.jsx                    Route definitions
  main.jsx                   Wraps App in BrowserRouter
  index.css
.env                          Points the frontend at the backend
```

The split between `hooks/` and `services/` is deliberate: components call the
hook, the hook calls the service, and the service is the seam where real
network calls live. `historyApi.js` just went from mock (localStorage) to
real (backend) without any other file needing to change — the same will
happen to `currencyApi.js` once live rates are added.

## What's not there yet

- **Live exchange rates** — `currencyApi.js` still returns mock numbers.
  Planned: Frankfurter (`https://api.frankfurter.app`, no key needed) or
  ExchangeRate-API (needs a free key).
- **Update/delete for history** — only retrieve and create are implemented
  on the backend, on purpose, for this milestone. Adding `PUT`/`DELETE`
  routes to `backend/server.js` plus matching functions in
  `historyApi.js` would round this out.
