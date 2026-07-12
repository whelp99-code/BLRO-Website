export const BOOTSTRAP_HEADING = "BLRO Website Foundation"

export default function Home() {
  return (
    <main className="bootstrap-shell">
      <section aria-labelledby="bootstrap-heading" className="bootstrap-panel">
        <p className="bootstrap-kicker">BLRO · Enterprise Technology Business</p>
        <h1 id="bootstrap-heading">{BOOTSTRAP_HEADING}</h1>
        <p className="bootstrap-copy">
          The application foundation is ready. Approved business content and design primitives follow in
          the next verified milestones.
        </p>
      </section>
    </main>
  )
}
