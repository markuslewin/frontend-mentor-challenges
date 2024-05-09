import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";

export function Layout() {
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <>
      <div>
        <header>
          <p>The Planets</p>
          <nav>
            {tabletMatches ? (
              <ul>
                <li>
                  <NavLink to="/mercury">Mercury</NavLink>
                </li>
                <li>
                  <NavLink to="/venus">Venus</NavLink>
                </li>
                <li>
                  <NavLink to="/earth">Earth</NavLink>
                </li>
                <li>
                  <NavLink to="/mars">Mars</NavLink>
                </li>
                <li>
                  <NavLink to="/jupiter">Jupiter</NavLink>
                </li>
                <li>
                  <NavLink to="/saturn">Saturn</NavLink>
                </li>
                <li>
                  <NavLink to="/uranus">Uranus</NavLink>
                </li>
                <li>
                  <NavLink to="/neptune">Neptune</NavLink>
                </li>
              </ul>
            ) : (
              <Dialog.Root>
                <Dialog.Trigger>Open menu</Dialog.Trigger>
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
