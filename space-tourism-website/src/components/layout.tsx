import { Link, NavLink, NavLinkProps, Outlet } from "react-router-dom";
import { Icon } from "./icon";
import { ReactNode } from "react";

export function Layout() {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_1fr]">
      <header className="mt-6 tablet:mt-0 desktop:mt-10 px-6 tablet:px-10 flex flex-wrap justify-between items-center">
        <Link to="/">
          <Icon className="size-10 tablet:size-12" name="logo" />
          <span className="sr-only">Home</span>
        </Link>
        <nav className="font-barlow-condensed text-nav-text uppercase">
          <button className="tablet:hidden" type="button">
            <Icon className="w-6 h-[1.3125rem]" name="icon-hamburger" />
            {/* <Icon className="w-5 h-[1.3125rem]" name="icon-close" /> */}
            <span className="sr-only">Open menu</span>
          </button>
          <ul className="bg-FFFFFF/[4%] text-FFFFFF hidden tablet:flex gap-12 h-24 px-12 desktop:px-[7.6875rem]">
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
          </ul>
        </nav>
      </header>
      <main className="grid">
        <Outlet />
      </main>
    </div>
  );
}

interface MyNavLinkProps extends Omit<NavLinkProps, "className"> {}

function MyNavLink(props: MyNavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        `flex items-center gap-3 border-y-[3px] ${isActive ? "border-t-[transparent] border-b-FFFFFF" : "border-[transparent]"}`
      }
    />
  );
}

function Number({ children }: { children: ReactNode }) {
  return (
    <span className="tablet:hidden desktop:inline font-bold" aria-hidden="true">
      {children}
    </span>
  );
}
