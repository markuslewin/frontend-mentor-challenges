import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { RouteAnnouncer } from "./route-announcer";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";
import { Icon } from "./icon";
import * as Burger from "../components/burger";
import { useId, useState } from "react";

export function Layout() {
  const headerNavHeading = useId();
  const footerNavHeading = useId();
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <>
      <div className="min-h-screen pb-20 desktop:pb-[5.5rem]">
        <header className="center pt-8 pb-10 tablet:pt-10 tablet:pb-14 desktop:py-11">
          <div className="flex justify-between items-center gap-4 tablet:flex-wrap">
            <div className="text-dark-grey-blue">
              <Logo />
            </div>
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
                <BurgerMenu />
              )}
            </nav>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <div className="center">
            <div className="bg-darker-grey-blue text-light-cream py-14 desktop:py-12">
              <div className="box-content max-w-[69.375rem] mx-auto desktop:px-10 desktop:grid desktop:grid-cols-[auto_103fr_auto_368fr_auto] desktop:items-center">
                <div className="flex justify-center">
                  <Logo />
                </div>
                <nav
                  className="col-start-3 mt-12 desktop:mt-0"
                  aria-labelledby={footerNavHeading}
                >
                  <h2 className="sr-only" id={footerNavHeading}>
                    Footer navigation
                  </h2>
                  <ul
                    className="text-grey text-navigation-menu uppercase flex flex-col items-center gap-6 tablet:flex-row tablet:justify-center"
                    role="list"
                  >
                    <li>
                      <NavLink
                        className="hocus:text-light-cream transition-colors"
                        to="/"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="hocus:text-light-cream transition-colors"
                        to="/about"
                      >
                        About us
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="hocus:text-light-cream transition-colors"
                        to="/plan"
                      >
                        Create your plan
                      </NavLink>
                    </li>
                  </ul>
                </nav>
                <h2 className="sr-only">Coffeeroasters on social media</h2>
                <ul
                  className="col-start-5 mt-12 flex justify-center items-center gap-6 desktop:mt-0"
                  role="list"
                >
                  <li>
                    <Link
                      className="hocus:text-pale-orange transition-colors"
                      to="#"
                    >
                      <Icon
                        className="w-6 h-auto"
                        name="icon-facebook"
                        width="24"
                        height="24"
                      />
                      <span className="sr-only">
                        Coffeeroasters on Facebook
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hocus:text-pale-orange transition-colors"
                      to="#"
                    >
                      <Icon
                        className="w-6 h-auto"
                        name="icon-twitter"
                        width="24"
                        height="20"
                      />
                      <span className="sr-only">Coffeeroasters on Twitter</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="hocus:text-pale-orange transition-colors"
                      to="#"
                    >
                      <Icon
                        className="w-6 h-auto"
                        name="icon-instagram"
                        width="24"
                        height="24"
                      />
                      <span className="sr-only">
                        Coffeeroasters on Instagram
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ScrollRestoration />
      <RouteAnnouncer />
    </>
  );
}

function Logo() {
  return (
    <p>
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

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Burger.Root open={isOpen} onOpenChange={setIsOpen}>
      <Burger.Trigger className="group">
        <Icon
          className="w-4 h-auto group-data-[state=open]:hidden"
          name="icon-hamburger"
          width="16"
          height="15"
        />
        <Icon
          className="w-[0.875rem] h-auto group-data-[state=closed]:hidden"
          name="icon-close"
          width="14"
          height="13"
        />
        <span className="sr-only">Menu</span>
      </Burger.Trigger>
      <Burger.Content>
        <ul
          className="font-fraunces text-h4 grid gap-8 justify-items-center"
          role="list"
        >
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/plan", label: "Create Your Plan" },
          ].map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.to}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </Burger.Content>
    </Burger.Root>
  );
}
