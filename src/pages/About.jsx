export default function About() {
  return (
    <section className="board about-board">
      <h2 className="board-heading">About this app</h2>
      <p>
        Exchange Desk is a small currency converter built as a miniproject. It
        converts between currencies, shows a full rate table against any base
        currency, and keeps a local history of past conversions.
      </p>

      <h3 className="about-subheading">Current status</h3>
      <p>
        This is the frontend milestone. Rates come from static placeholder
        data in <code>src/data/currencies.js</code> — nothing here calls a
        real API yet.
      </p>

      <h3 className="about-subheading">What's next</h3>
      <p>
        The next session connects <code>src/services/currencyApi.js</code> to
        a live rates provider (Frankfurter, to start — no API key required),
        and optionally moves conversion history from local storage to a small
        backend.
      </p>

      <h3 className="about-subheading">Pages</h3>
      <ul className="about-list">
        <li><strong>Convert</strong> — the main converter tool</li>
        <li><strong>Rates</strong> — full table of one base against every currency</li>
        <li><strong>History</strong> — saved past conversions</li>
        <li><strong>About</strong> — this page</li>
      </ul>
    </section>
  );
}
