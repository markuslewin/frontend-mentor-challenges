import { NavLink, Outlet } from "react-router-dom";

export function DestinationRoute() {
  return (
    <>
      <h1>Destination</h1>
      {/* todo: Name nav */}
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/destination">Moon</NavLink>
          </li>
          <li>
            <NavLink to="/destination/mars">Mars</NavLink>
          </li>
          <li>
            <NavLink to="/destination/europa">Europa</NavLink>
          </li>
          <li>
            <NavLink to="/destination/titan">Titan</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
