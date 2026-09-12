// ---------------------------------------------------------------------------
// Conversion history service.
//
// For now this persists to localStorage, since there's no backend yet.
// Next session, once a backend exists, swap the bodies of these two
// functions for real API calls (e.g. GET/POST /history) — callers
// (the History page, useConverter) don't need to change, since they only
// depend on the function signatures below.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "exchange-desk:history";
const MAX_ENTRIES = 20;

/**
 * @returns {Array<{ id: string, amount: number, from: string, to: string, result: number, at: string }>}
 */
export function getHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Records a completed conversion. Newest first, capped at MAX_ENTRIES.
 * TODO (next session): replace with `await fetch(`${API_BASE}/history`, { method: "POST", ... })`
 */
export function addHistoryEntry({ amount, from, to, result }) {
  const entry = {
    id: crypto.randomUUID(),
    amount,
    from,
    to,
    result,
    at: new Date().toISOString(),
  };
  const existing = getHistory();
  const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return entry;
}

/**
 * TODO (next session): replace with `await fetch(`${API_BASE}/history`, { method: "DELETE" })`
 */
export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
