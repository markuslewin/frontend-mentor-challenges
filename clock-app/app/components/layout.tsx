import {
  NavLink,
  NavLinkProps,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { useMediaQuery } from "@uidotdev/usehooks";
import { RouteAnnouncer } from "#app/components/route-announcer";
import { screens } from "#app/utils/screens";
import { useTheme } from "#app/utils/theme";
import { Announcer } from "#app/components/announcer/announcer";

export function Layout() {
  const { theme, setTheme } = useTheme();
  const tabletMatches = useMediaQuery(`(min-width: ${screens.tablet})`);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <>
      <div className="min-h-screen px-4 tablet:px-10">
        <header className="mx-auto flex max-w-5xl flex-wrap justify-between gap-6 py-6">
          <p>Logo</p>
          <div className="flex flex-wrap items-center gap-4">
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
                    <MyNavLink to="/nested-routes">Nested routes</MyNavLink>
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
                          <MyNavLink to="/nested-routes">
                            Nested routes
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
          <div className="mx-auto max-w-3xl py-6 tablet:py-20">
            <Outlet />
          </div>
        </main>
      </div>
      <ScrollRestoration />
      <Announcer />
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
