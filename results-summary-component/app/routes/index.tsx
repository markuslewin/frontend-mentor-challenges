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
    <>
      Your Result 76 of 100 Great You scored higher than 65% of the people who
      have taken these tests. Summary Reaction 80 / 100 Memory 92 / 100 Verbal
      61 / 100 Visual 72 / 100 Continue
      <div className="attribution">
        Challenge by
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="#">Your Name Here</a>.
      </div>
    </>
  );
}
