import { Link, Outlet } from "react-router-dom";
import { Icon } from "./icon";

export function Layout() {
  return (
    <div className="screen">
      <header className="[ header ] [ repel ]">
        <p className="header__logo">
          <Link to="/">
            <Icon className="logo" name="logo" width="170" height="48" />
            <span className="sr-only">Home</span>
          </Link>
        </p>
        <nav>
          <Link className="header__start" to="/starry night">
            Start slideshow
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
