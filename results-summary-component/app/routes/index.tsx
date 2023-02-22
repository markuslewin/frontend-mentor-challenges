import results from "~/data/data.json";

export default function Index() {
  return (
    <main className="cover">
      <article className="[ card ] [ center columns shape ]" data-shape-float>
        <article>
          <h1>Your Result</h1>
          <figure>
            <p>
              <strong>76</strong> of 100
            </p>
            <figcaption>
              <p>
                <strong>Great</strong>
              </p>
            </figcaption>
          </figure>
          <p>
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </article>
        <article>
          <h2>Summary</h2>
          <ul>
            {results.map((result) => (
              <li key={result.category}>
                <img alt="" src={result.icon} />
                {result.category} <strong>{result.score}</strong> / 100
              </li>
            ))}
          </ul>
          <button className="[ button ] [ shape size ]">Continue</button>
        </article>
      </article>
    </main>
  );
}
