// ---------------------------------------------------------------------------
// Conversion history service.
//
// This now talks to the real backend in backend/ (see backend/server.js and
// backend/db/exchange_desk_db.sql). Only GET (retrieve) and POST (create)
// are implemented on the backend for now, so there is no delete/update here
// yet — that can be added later once PUT/DELETE routes exist.
// ---------------------------------------------------------------------------

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Retrieves saved conversions from the backend, newest first.
 * @returns {Promise<Array<{ id: number, amount: number, from: string, to: string, result: number, at: string }>>}
 */
export async function getHistory() {
  const response = await fetch(`${API_BASE}/conversions`);

  if (!response.ok) {
    throw new Error("Could not load history from the server.");
  }

  const rows = await response.json();

  // Backend column names -> the shape the UI already expects.
  return rows.map((row) => ({
    id: row.id,
    amount: Number(row.amount),
    from: row.from_currency,
    to: row.to_currency,
    result: Number(row.result_amount),
    at: row.created_at,
  }));
}

/**
 * Saves a completed conversion to the backend.
 * @returns {Promise<{ id: number, amount: number, from: string, to: string, result: number }>}
 */
export async function addHistoryEntry({ amount, from, to, result }) {
  const response = await fetch(`${API_BASE}/conversions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      from_currency: from,
      to_currency: to,
      result_amount: result,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not save this conversion.");
  }

  const data = await response.json();
  return { id: data.id, amount, from, to, result };
}
