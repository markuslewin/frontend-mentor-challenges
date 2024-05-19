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
        <header className="center pt-8 pb-10 tablet:pt-10 tablet:pb-14 desktop:py-11">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <Logo />
            <nav aria-labelledby={headerNavHeading}>
              <h2 className="sr-only" id={headerNavHeading}>
                Header navigation
              </h2>
              {tabletMatches ? (
                <ul
                  className="text-grey text-navigation-menu uppercase flex flex-wrap items-center gap-8"
                  role="list"
                >
                  <li>
                    <NavLink
                      className="hocus:text-dark-grey-blue transition-colors"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="hocus:text-dark-grey-blue transition-colors"
                      to="/about"
                    >
                      About us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="hocus:text-dark-grey-blue transition-colors"
                      to="/plan"
                    >
                      Create your plan
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <Dialog.Root>
                  <Dialog.Trigger className="text-dark-grey-blue block">
                    <Icon
                      className="w-4"
                      name="icon-hamburger"
                      width="16"
                      height="15"
                    />
                    <span className="sr-only">Open menu</span>
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
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Logo />
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

function Logo() {
  return (
    <p className="text-dark-grey-blue">
      <Link to="/">
        <Icon
          className="w-auto h-[1.1875rem] tablet:h-[1.6875rem]"
          name="logo"
          width="237"
          height="27"
        />
        <span className="sr-only">Home, Coffeeroasters</span>
      </Link>
    </p>
  );
}
