import {
  NavLink,
  NavLinkProps,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";

export function Layout() {
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <>
      <div className="min-h-screen px-4 tablet:px-10">
        <header className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-6">
          <p>Logo</p>
          <nav>
            {tabletMatches ? (
              <ul className="flex flex-wrap gap-4">
                <li>
                  <MyNavLink to="/">Home</MyNavLink>
                </li>
                <li>
                  <MyNavLink to="/api-endpoint">API endpoint</MyNavLink>
                </li>
                <li>
                  <MyNavLink to="/form-validation">Form validation</MyNavLink>
                </li>
                <li>
                  <MyNavLink to="/nested-routes">Nested routes</MyNavLink>
                </li>
                <li>
                  <MyNavLink to="/optimized-image">Optimized image</MyNavLink>
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
                    <ul className="mt-16 grid gap-6">
                      <li>
                        <MyNavLink to="/">Home</MyNavLink>
                      </li>
                      <li>
                        <MyNavLink to="/api-endpoint">API endpoint</MyNavLink>
                      </li>
                      <li>
                        <MyNavLink to="/form-validation">
                          Form validation
                        </MyNavLink>
                      </li>
                      <li>
                        <MyNavLink to="/nested-routes">Nested routes</MyNavLink>
                      </li>
                      <li>
                        <MyNavLink to="/optimized-image">
                          Optimized image
                        </MyNavLink>
                      </li>
                    </ul>
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

interface MyNavLinkProps extends Omit<NavLinkProps, "className"> {}

function MyNavLink(props: MyNavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? `underline underline-offset-4` : undefined
      }
    />
  );
}
