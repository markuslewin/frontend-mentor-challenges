import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type IndexData = {
  // resources: Array<{ name: string; url: string }>;
  // demos: Array<{ name: string; to: string }>;
};

export let loader: LoaderFunction = () => {
  let data: IndexData = {};

  return json(data);
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

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
            <li>
              <img alt="" src="/images/icon-reaction.svg" />
              Reaction <strong>80</strong> / 100
            </li>
            <li>
              <img alt="" src="/images/icon-memory.svg" />
              Memory <strong>92</strong> / 100
            </li>
            <li>
              <img alt="" src="/images/icon-verbal.svg" />
              Verbal <strong>61</strong> / 100
            </li>
            <li>
              <img alt="" src="/images/icon-visual.svg" />
              Visual <strong>72</strong> / 100
            </li>
          </ul>
          <button>Continue</button>
        </article>
      </article>
    </main>
  );
}
