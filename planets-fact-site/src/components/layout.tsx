import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";
import styles from "./layout.module.css";
import { Icon } from "./icon";

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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-mercury))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-venus))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-earth))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-mars))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-jupiter))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-saturn))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-uranus))",
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
                      ["--header-link-color" as string]:
                        "hsl(var(--color-neptune))",
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
          <div className="max-w-3xl mx-auto py-6 tablet:py-20">
            <Outlet />
          </div>
        </main>
      </div>
      <ScrollRestoration />
      <RouteAnnouncer />
    </>
  );
}
