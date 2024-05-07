import { Link, Outlet } from "react-router-dom";
import { Icon } from "./icon";
import { paintings } from "../utils/paintings";
import { useSlideshow } from "../utils/slideshow";

export function Layout() {
  const { isSlideshow } = useSlideshow();

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
          {isSlideshow ? (
            <Link className="header__start" to="/">
              Stop slideshow
            </Link>
          ) : (
            <Link className="header__start" to={`${paintings[0].name}`}>
              Start slideshow
            </Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
