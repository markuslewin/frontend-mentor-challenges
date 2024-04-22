import { NavLink, Outlet } from "react-router-dom";

export function TechnologyRoute() {
  return (
    <>
      <h1>Technology</h1>
      {/* todo: Name nav */}
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/technology">Launch vehicle</NavLink>
          </li>
          <li>
            <NavLink to="/technology/spaceport">Spaceport</NavLink>
          </li>
          <li>
            <NavLink to="/technology/space-capsule">Space capsule</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
