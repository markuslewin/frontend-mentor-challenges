import {
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import { AnnouncementHandle } from "../components/route-announcer";
import { planets } from "../utils/planets/planets";
import { useId } from "react";

type LoaderData = ReturnType<typeof loader>;

export const handle = {
  announcement(data) {
    return data.planet.name;
  },
} satisfies AnnouncementHandle<LoaderData>;

export function loader({ params }: LoaderFunctionArgs) {
  const { name } = params;
  invariantResponse(typeof name === "string", "Name must be a string");

  // const planet = planets.find
  // invariantResponse(message, "Planet not found", { status: 404 });
  const planet = planets[0];

  return { planet };
}

export function PlanetRoute() {
  const data = useLoaderData() as LoaderData;
  const navHeadingId = useId();

  return (
    <article>
      <header>
        <nav aria-labelledby={navHeadingId}>
          <h2 id={navHeadingId}>Planet navigation</h2>
          <ol>
            <li>
              <NavLink to="">Overview</NavLink>
            </li>
            <li>
              <NavLink to="internal-structure">Internal structure</NavLink>
            </li>
            <li>
              <NavLink to="surface-geology">Surface geology</NavLink>
            </li>
          </ol>
        </nav>
      </header>
      <Outlet context={data satisfies Context} />
    </article>
  );
}

interface Context extends LoaderData {}

export function usePlanetContext() {
  return useOutletContext<Context>();
}
