import { NavLink, Outlet } from "react-router-dom";

export function CrewRoute() {
  return (
    <>
      <h1>Crew</h1>
      {/* todo: Name nav */}
      <nav>
        <ul className="flex flex-wrap gap-4">
          <li>
            <NavLink to="/crew">Douglas Hurley</NavLink>
          </li>
          <li>
            <NavLink to="/crew/mark-shuttleworth">Mark Shuttleworth</NavLink>
          </li>
          <li>
            <NavLink to="/crew/victor-glover">Victor Glover</NavLink>
          </li>
          <li>
            <NavLink to="/crew/anousheh-ansari">Anousheh Ansari</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
