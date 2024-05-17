import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";
import { Icon } from "./icon";
import { useId } from "react";

export function Layout() {
  const headerNavHeading = useId();
  const footerNavHeading = useId();
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <>
      <div className="min-h-screen">
        <header>
          <p>
            <Icon name="logo" />
            <span>Coffeeroasters</span>
          </p>
          <nav aria-labelledby={headerNavHeading}>
            <h2 id={headerNavHeading}>Header navigation</h2>
            {tabletMatches ? (
              <ul role="list">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About us</NavLink>
                </li>
                <li>
                  <NavLink to="/plan">Create your plan</NavLink>
                </li>
              </ul>
            ) : (
              <Dialog.Root>
                <Dialog.Trigger>
                  <Icon name="icon-hamburger" />
                  <span>Open menu</span>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content aria-describedby={undefined}>
                    <Dialog.Title className="sr-only">Menu</Dialog.Title>
                    <Dialog.Close>
                      <Icon name="icon-close" />
                      <span>Close menu</span>
                    </Dialog.Close>
                    <ul role="list">
                      <li>
                        <NavLink to="/">Home</NavLink>
                      </li>
                      <li>
                        <NavLink to="/about">About us</NavLink>
                      </li>
                      <li>
                        <NavLink to="/plan">Create your plan</NavLink>
                      </li>
                    </ul>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>
            <Icon name="logo" />
            <span>Coffeeroasters</span>
          </p>
          <nav aria-labelledby={footerNavHeading}>
            <h2 id={footerNavHeading}>Footer navigation</h2>
            <ul role="list">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About us</NavLink>
              </li>
              <li>
                <NavLink to="/plan">Create your plan</NavLink>
              </li>
            </ul>
          </nav>
          <h2>Coffeeroasters on social media</h2>
          <ul role="list">
            <li>
              <Link to="#">
                <Icon name="icon-facebook" />
                <span>Coffeeroasters on Facebook</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <Icon name="icon-twitter" />
                <span>Coffeeroasters on Twitter</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <Icon name="icon-instagram" />
                <span>Coffeeroasters on Instagram</span>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
      <ScrollRestoration />
      <RouteAnnouncer />
    </>
  );
}
