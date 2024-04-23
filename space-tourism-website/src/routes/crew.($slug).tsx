import { invariantResponse } from "@epic-web/invariant";
import { LoaderFunctionArgs, NavLink, useLoaderData } from "react-router-dom";
import data from "../data/data.json";
import { assertValidSlug } from "../utils/assert-valid-slug";

interface LoaderData {
  member: (typeof data)["crew"][number];
}

export function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  assertValidSlug(
    [
      "douglas-hurley",
      "mark-shuttleworth",
      "victor-glover",
      "anousheh-ansari",
    ] as const,
    slug
  );

  const name = (
    {
      "douglas-hurley": "Douglas Hurley",
      "mark-shuttleworth": "Mark Shuttleworth",
      "victor-glover": "Victor Glover",
      "anousheh-ansari": "Anousheh Ansari",
    } as const
  )[slug];
  const member = data.crew.find((member) => member.name === name);
  invariantResponse(member, "Not found", { status: 404 });

  return { member } satisfies LoaderData;
}

export function CrewRoute() {
  const { member } = useLoaderData() as LoaderData;

  return (
    <>
      <h2>{member.name}</h2>
      {/* todo: Name nav */}
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/crew/douglas-hurley">Douglas Hurley</NavLink>
          </li>
          <li>
            <NavLink to="/crew/mark-shuttleworth">Mark Shuttleworth</NavLink>
          </li>
          <li>
            <NavLink to="/crew/victor-glover">Victor Glover</NavLink>
          </li>
          <li>
            <NavLink to="/crew/anousheh-ansari">Anousheh Ansari</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
