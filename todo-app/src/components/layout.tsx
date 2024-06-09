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
import { cva } from "class-variance-authority";
import { useTheme } from "../utils/theme";

export function Layout() {
  const { theme, setTheme } = useTheme();
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <>
      <div className="min-h-screen px-4 tablet:px-10">
        <header className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-6">
          <p>Logo</p>
          <div className="flex items-center flex-wrap gap-4">
            <button type="button" onClick={() => setTheme(nextTheme)}>
              Switch to {nextTheme} mode
            </button>
            <p className="sr-only" aria-live="assertive">
              {theme} mode is enabled.
            </p>
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
                          <MyNavLink to="/nested-routes">
                            Nested routes
                          </MyNavLink>
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
          </div>
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

const navLinkVariants = cva("hocus:underline hocus:underline-offset-4", {
  variants: {
    state: { active: "underline underline-offset-4" },
  },
});

interface MyNavLinkProps extends Omit<NavLinkProps, "className"> {
  className?: string;
}

function MyNavLink({ className, ...props }: MyNavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        navLinkVariants({
          className,
          state: isActive ? "active" : null,
        })
      }
    />
  );
}
