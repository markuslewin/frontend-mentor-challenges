import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

export function NestedRoutes() {
  return (
    <>
      <h1 className="text-heading-l">Nested routes</h1>
      <ul className="my-8 flex flex-wrap gap-4 items-center">
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
        `rounded-full font-medium py-3 px-4 block transition-colors ${
          isActive ? "bg-white text-slate-950" : ""
        }`
      }
      {...props}
    />
  );
}
