import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import paintings from "../data/paintings.json";

export function loader({ params }: LoaderFunctionArgs) {
  const { paintingName } = params;
  invariantResponse(
    typeof paintingName === "string",
    "Painting must be a string"
  );

  const painting = paintings.find(
    (p) => p.name.toLowerCase() === paintingName.toLowerCase()
  );
  invariantResponse(painting, "Painting not found", {
    status: 404,
  });

  return { painting };
}

export function PaintingRoute() {
  const { painting } = useLoaderData() as ReturnType<typeof loader>;

  return (
    <>
      <h2>Painting: {painting.name}</h2>
    </>
  );
}
