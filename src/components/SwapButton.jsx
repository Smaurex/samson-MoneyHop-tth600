export default function SwapButton({ onClick }) {
  return (
    <button
      type="button"
      className="swap-button"
      onClick={onClick}
      aria-label="Swap currencies"
      title="Swap currencies"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M7 7h11l-3-3m3 3-3 3M17 17H6l3 3m-3-3 3-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
