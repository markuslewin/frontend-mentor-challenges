import { NavLink, NavLinkProps, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen px-4 tablet:px-10">
      <header className="max-w-5xl mx-auto py-6 flex flex-wrap justify-between gap-6">
        <p>Logo</p>
        <nav>
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
        </nav>
      </header>
      <main>
        <div className="max-w-3xl mx-auto py-6 tablet:py-20">
          <Outlet />
        </div>
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
        isActive ? `underline underline-offset-4` : undefined
      }
    />
  );
}
