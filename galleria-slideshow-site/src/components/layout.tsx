import { Link, Outlet } from "react-router-dom";
import { Icon } from "./icon";

export function Layout() {
  return (
    <div>
      <header>
        <p>
          <Icon name="logo" />
          <span className="sr-only">Galleria</span>
        </p>
        <nav>
          <Link to="/starry night">Start slideshow</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
