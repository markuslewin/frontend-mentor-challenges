import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

export function NestedRoutes() {
  return (
    <>
      <h1 className="text-heading-l">Nested routes</h1>
      <ul className="my-8 flex flex-wrap items-center gap-4">
        <li>
          <MyNavLink to={"/nested-routes"} end>
            Messages
          </MyNavLink>
        </li>
        <li>
          <MyNavLink to={"/nested-routes/create"}>Add</MyNavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

interface MyNavLinkProps extends NavLinkProps {}

function MyNavLink(props: MyNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `block rounded-full px-4 py-3 font-medium transition-colors ${
          isActive ? "bg-pill text-pill-foreground" : ""
        }`
      }
      {...props}
    />
  );
}
