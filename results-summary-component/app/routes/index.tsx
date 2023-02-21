import results from "~/data/data.json";

export default function Index() {
  return (
    <main>
      <article>
        <h1>Your Result</h1>
        <figure>
          <p>
            <strong>76</strong> of 100
          </p>
          <figcaption>
            <p>Great</p>
          </figcaption>
        </figure>
        <p>
          You scored higher than 65% of the people who have taken these tests.
        </p>
        <article>
          <h2>Summary</h2>
          <ul>
            {results.map((result) => (
              <li>
                <img alt="" src={result.icon} />
                {result.category} <strong>{result.score}</strong> / 100
              </li>
            ))}
          </ul>
          <button>Continue</button>
        </article>
      </article>
    </main>
  );
}
