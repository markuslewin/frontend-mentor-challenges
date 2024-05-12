import {
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import { AnnouncementHandle } from "../components/route-announcer";
import { colorByPlanet, planets } from "../utils/planets/planets";
import { useId } from "react";
import styles from "./$name.module.css";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";

type LoaderData = ReturnType<typeof loader>;

export const handle = {
  announcement(data) {
    return data.planet.name;
  },
} satisfies AnnouncementHandle<LoaderData>;

export function loader({ params }: LoaderFunctionArgs) {
  const { name } = params;
  invariantResponse(typeof name === "string", "Name must be a string");

  const planet = planets.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );
  invariantResponse(planet, "Planet not found", { status: 404 });

  return { planet };
}

export function PlanetRoute() {
  const data = useLoaderData() as LoaderData;
  const navHeadingId = useId();
  const matchesTablet = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <article
      className={[styles.article, "center"].join(" ")}
      style={{ ["--planet-color" as string]: colorByPlanet[data.planet.name] }}
    >
      <header className={[styles["article__header"], styles.header].join(" ")}>
        <nav aria-labelledby={navHeadingId}>
          <h2 className="sr-only" id={navHeadingId}>
            Planet navigation
          </h2>
          <ul className={styles["header__views"]}>
            <li>
              <NavLink
                className={styles["header__view"]}
                to=""
                end
                preventScrollReset
              >
                {matchesTablet ? (
                  <>
                    <span
                      className={styles["header__view-number"]}
                      aria-hidden="true"
                    >
                      01
                    </span>
                    Overview
                  </>
                ) : (
                  "Overview"
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles["header__view"]}
                to="internal-structure"
                preventScrollReset
              >
                {matchesTablet ? (
                  <>
                    <span
                      className={styles["header__view-number"]}
                      aria-hidden="true"
                    >
                      02
                    </span>
                    Internal structure
                  </>
                ) : (
                  "Structure"
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles["header__view"]}
                to="surface-geology"
                preventScrollReset
              >
                {matchesTablet ? (
                  <>
                    <span
                      className={styles["header__view-number"]}
                      aria-hidden="true"
                    >
                      03
                    </span>
                    Surface geology
                  </>
                ) : (
                  "Surface"
                )}
              </NavLink>
            </li>
          </ul>
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
