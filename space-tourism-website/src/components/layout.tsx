import { Link, NavLink, NavLinkProps, Outlet } from "react-router-dom";
import { Icon } from "./icon";
import { ReactNode } from "react";
import { useName } from "../utils/use-name";
import { MobileMenu } from "./menu";
import { useMedia } from "../utils/use-media";
import { screens } from "../utils/screens";

export function Layout() {
  const { name } = useName();
  const { matches: tabletMatches } = useMedia(`(min-width: ${screens.tablet})`);

  return (
    <div className="background" data-name={name ?? undefined}>
      <div className="min-h-[min(100vh,63rem)] grid grid-rows-[max-content_1fr]">
        <header className="header glassy mt-6 tablet:mt-0 desktop:mt-10 px-6 tablet:pr-0 tablet:pl-10 desktop:px-10">
          <Link
            className="desktop:justify-self-end desktop:grid desktop:grid-cols-[max-content,minmax(2rem,4rem)]"
            to="/"
          >
            <Icon className="size-10 tablet:size-12" name="logo" />
            <span className="sr-only">Home</span>
          </Link>
          <nav className="flex items-center font-barlow-condensed text-nav-text uppercase desktop:before:h-px desktop:before:bg-FFFFFF/25 desktop:before:grow desktop:before:-mr-8 desktop:before:z-10">
            {tabletMatches ? (
              <ol className="glassy__surface text-FFFFFF tablet:flex gap-12 h-24 px-12 desktop:pl-[7.6875rem] desktop:pr-0">
                <li className="grid">
                  <MyNavLink to="/">
                    <Number>00</Number>
                    Home
                  </MyNavLink>
                </li>
                <li className="grid">
                  <MyNavLink to="/destination">
                    <Number>01</Number>
                    Destination
                  </MyNavLink>
                </li>
                <li className="grid">
                  <MyNavLink to="/crew">
                    <Number>02</Number>
                    Crew
                  </MyNavLink>
                </li>
                <li className="grid">
                  <MyNavLink to="/technology">
                    <Number>03</Number>
                    Technology
                  </MyNavLink>
                </li>
              </ol>
            ) : (
              <MobileMenu />
            )}
          </nav>
        </header>
        <main className="grid">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface MyNavLinkProps extends Omit<NavLinkProps, "className"> {}

function MyNavLink(props: MyNavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `flex items-center gap-3 ${isActive ? "border-b-FFFFFF border-b-[3px] pt-[3px]" : "hocus:border-b-FFFFFF/50 hocus:border-b-[3px] py-[3px] hocus:pt-[3px] hocus:pb-0"}`
      }
    />
  );
}

function Number({ children }: { children: ReactNode }) {
  return (
    <span className="tablet:hidden desktop:inline font-bold">{children}</span>
  );
}
