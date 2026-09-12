import { CURRENCIES } from "../data/currencies";

export default function CurrencySelect({ label, value, onChange, id }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <select
        id={id}
        className="field-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} — {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
