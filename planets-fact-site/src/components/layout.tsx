import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";
import styles from "./layout.module.css";
import { Icon } from "./icon";
import { colorByPlanet } from "../utils/planets/planets";

export function Layout() {
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <>
      <div>
        <header className={styles.header}>
          <p className={styles["header__name"]}>The Planets</p>
          <nav className={styles["header__nav"]}>
            {tabletMatches ? (
              <ul className={`[ ${styles["header__links"]} ] [ cluster ]`}>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Mercury,
                    }}
                    to="/mercury"
                  >
                    Mercury
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Venus,
                    }}
                    to="/venus"
                  >
                    Venus
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Earth,
                    }}
                    to="/earth"
                  >
                    Earth
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Mars,
                    }}
                    to="/mars"
                  >
                    Mars
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Jupiter,
                    }}
                    to="/jupiter"
                  >
                    Jupiter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Saturn,
                    }}
                    to="/saturn"
                  >
                    Saturn
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Uranus,
                    }}
                    to="/uranus"
                  >
                    Uranus
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={styles["header__link"]}
                    style={{
                      ["--header-link-color" as string]: colorByPlanet.Neptune,
                    }}
                    to="/neptune"
                  >
                    Neptune
                  </NavLink>
                </li>
              </ul>
            ) : (
              <Dialog.Root>
                <Dialog.Trigger className={styles["header__trigger"]}>
                  <Icon
                    className="w-6 h-auto"
                    name="icon-hamburger"
                    width="24"
                    height="17"
                  />
                  <span className="sr-only">Open menu</span>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="menu__overlay" />
                  <Dialog.Content
                    className="menu__content"
                    aria-describedby={undefined}
                  >
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>
                    {/* <Dialog.Description /> */}
                    <Dialog.Close>Close menu</Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <ScrollRestoration />
      <RouteAnnouncer />
    </>
  );
}
