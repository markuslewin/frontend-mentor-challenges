import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";
import styles from "./layout.module.css";
import { Icon } from "./icon";
import { colorByPlanet } from "../utils/planets/planets";
import { ReactNode, useState } from "react";

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
                  <PlanetLink to="/mercury" color={colorByPlanet.Mercury}>
                    Mercury
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/venus" color={colorByPlanet.Venus}>
                    Venus
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/earth" color={colorByPlanet.Earth}>
                    Earth
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/mars" color={colorByPlanet.Mars}>
                    Mars
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/jupiter" color={colorByPlanet.Jupiter}>
                    Jupiter
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/saturn" color={colorByPlanet.Saturn}>
                    Saturn
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/uranus" color={colorByPlanet.Uranus}>
                    Uranus
                  </PlanetLink>
                </li>
                <li>
                  <PlanetLink to="/neptune" color={colorByPlanet.Neptune}>
                    Neptune
                  </PlanetLink>
                </li>
              </ul>
            ) : (
              <Menu />
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

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
        <Dialog.Content className="menu__content" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Close className="sr-only">Close menu</Dialog.Close>
          <ul className={`${styles["header__links"]}`}>
            <li>
              <PlanetLink
                to="/mercury"
                color={colorByPlanet.Mercury}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Mercury{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/venus"
                color={colorByPlanet.Venus}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Venus{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/earth"
                color={colorByPlanet.Earth}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Earth{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/mars"
                color={colorByPlanet.Mars}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Mars{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/jupiter"
                color={colorByPlanet.Jupiter}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Jupiter{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/saturn"
                color={colorByPlanet.Saturn}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Saturn{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/uranus"
                color={colorByPlanet.Uranus}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Uranus{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
            <li>
              <PlanetLink
                to="/neptune"
                color={colorByPlanet.Neptune}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className={styles["header__link-planet"]} /> Neptune{" "}
                <PlanetLinkIcon />
              </PlanetLink>
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PlanetLink({
  color,
  to,
  children,
  onClick,
}: {
  color: string;
  to: string;
  children: ReactNode;
  onClick?(): void;
}) {
  return (
    <NavLink
      className={styles["header__link"]}
      style={{
        ["--header-link-color" as string]: color,
      }}
      to={to}
      onClick={onClick}
      preventScrollReset
    >
      {children}
    </NavLink>
  );
}

function PlanetLinkIcon() {
  return <Icon className={styles["header__link-icon"]} name="icon-chevron" />;
}
