export default function About() {
  return (
    <section className="board about-board">
      <h2 className="board-heading">About this app</h2>
      <p>
        Exchange Desk is a small currency converter built as a miniproject. It
        converts between currencies, shows a full rate table against any base
        currency, and keeps a history of past conversions.
      </p>

      <h3 className="about-subheading">Current status</h3>
      <p>
        Conversion rates are still static placeholder data in{" "}
        <code>src/data/currencies.js</code>. History, however, is now backed
        by a real Express + MySQL API in <code>backend/</code> — retrieving
        and saving conversions goes through it instead of local storage.
      </p>

      <h3 className="about-subheading">What's next</h3>
      <p>
        Connecting <code>src/services/currencyApi.js</code> to a live rates
        provider (Frankfurter, to start — no API key required), and adding
        update/delete routes to the backend so history can be edited or
        cleared.
      </p>

      <h3 className="about-subheading">Pages</h3>
      <ul className="about-list">
        <li><strong>Convert</strong> — the main converter tool</li>
        <li><strong>Rates</strong> — full table of one base against every currency</li>
        <li><strong>History</strong> — saved past conversions, from the database</li>
        <li><strong>About</strong> — this page</li>
      </ul>
    </section>
  );
}
