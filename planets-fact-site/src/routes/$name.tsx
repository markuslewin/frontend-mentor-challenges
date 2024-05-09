import {
  Link,
  LoaderFunctionArgs,
  NavLink,
  useLoaderData,
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
  const { planet } = useLoaderData() as LoaderData;
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
      <h1 className="font-antonio text-h1">{planet.name}</h1>
      <h2>Description</h2>
      <p>{planet.overview.content}</p>
      <h2>Source</h2>
      <p>
        : <Link to={planet.overview.source}>Wikipedia</Link>
      </p>
      <h2>Image</h2>
      {/* todo: `width`, `height` */}
      <img
        alt={`todo: Visual description of "${planet.name}"`}
        src={planet.images.planet}
      />
      <h2>Characteristics</h2>
      <h3>Rotation time</h3>
      <p>{planet.rotation}</p>
      <h3>Revolution time</h3>
      <p>{planet.revolution}</p>
      <h3>Radius</h3>
      <p>{planet.radius}</p>
      <h3>Average temp.</h3>
      <p>{planet.temperature}</p>
    </article>
  );
}
