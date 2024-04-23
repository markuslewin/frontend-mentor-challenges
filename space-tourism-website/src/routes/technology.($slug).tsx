import { invariantResponse } from "@epic-web/invariant";
import { LoaderFunctionArgs, NavLink, useLoaderData } from "react-router-dom";
import data from "../data/data.json";
import { assertValidSlug } from "../utils/assert-valid-slug";

interface LoaderData {
  technology: (typeof data)["technology"][number];
}

export function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  assertValidSlug(
    ["launch-vehicle", "spaceport", "space-capsule"] as const,
    slug
  );

  const name = (
    {
      "launch-vehicle": "Launch vehicle",
      spaceport: "Spaceport",
      "space-capsule": "Space capsule",
    } as const
  )[slug];
  const technology = data.technology.find((member) => member.name === name);
  invariantResponse(technology, "Not found", { status: 404 });

  return { technology } satisfies LoaderData;
}

export function TechnologyRoute() {
  const { technology } = useLoaderData() as LoaderData;

  return (
    <>
      <h2>{technology.name}</h2>
      {/* todo: Name nav */}
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/technology/launch-vehicle">Launch vehicle</NavLink>
          </li>
          <li>
            <NavLink to="/technology/spaceport">Spaceport</NavLink>
          </li>
          <li>
            <NavLink to="/technology/space-capsule">Space capsule</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
