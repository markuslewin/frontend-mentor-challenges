import results from "~/data/data.json";

export default function Index() {
  return (
    <main className="cover">
      <article
        className="[ card ] [ center columns shadow shape size ]"
        data-shape-float
      >
        <article className="[ card__result ] [ flow shape ]">
          <h1>Your Result</h1>
          <figure className="flow">
            <p className="[ dent ] [ center middle shape size ]">
              <strong className="dent__score">76</strong> of 100
            </p>
            <figcaption className="card__caption">
              <p>
                <strong>Great</strong>
              </p>
            </figcaption>
          </figure>
          <p className="[ card__description ] [ center ]">
            You scored higher than 65% of the people who have taken these tests.
          </p>
        </article>
        <article
          className="[ card__summary ] [ container flow ]"
          data-flow-split="last"
        >
          <h2>Summary</h2>
          <div>
            <ul role="list" className="[ card__results ] [ flow reset ]">
              {results.map((result) => (
                <li
                  className="[ result ] [ cluster shape ]"
                  key={result.category}
                  data-result-category={result.category}
                >
                  <span className="[ result__category ] [ cluster ]">
                    <img
                      className="[ result__icon ] [ size ]"
                      alt=""
                      src={result.icon}
                      width="20"
                      height="20"
                    />
                    {result.category}
                  </span>{" "}
                  <span>
                    <strong>{result.score}</strong>{" "}
                    <span className="result__max">/ 100</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <button className="[ button ] [ background shape size ]">
            Continue
          </button>
        </article>
      </article>
    </main>
  );
}
