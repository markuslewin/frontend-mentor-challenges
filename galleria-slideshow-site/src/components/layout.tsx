import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { Icon } from "./icon";
import { paintings } from "../utils/paintings";
import { useSlideshow } from "../utils/slideshow";
import { RouteAnnouncer } from "./route-announcer";
import { useId } from "react";

export function Layout() {
  const { isSlideshow } = useSlideshow();
  const navigate = useNavigate();
  const navHeadingId = useId();

  return (
    <div className="screen">
      <header className="[ header ] [ repel ]">
        <p className="header__logo">
          <Link to="/">
            <Icon className="logo" name="logo" width="170" height="48" />
            <span className="sr-only">Home</span>
          </Link>
        </p>
        <nav aria-labelledby={navHeadingId}>
          <h2 className="sr-only" id={navHeadingId}>
            Primary navigation
          </h2>
          {isSlideshow ? (
            <button
              className="header__start"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Stop slideshow
            </button>
          ) : (
            <button
              className="header__start"
              type="button"
              onClick={() => {
                navigate(`${paintings[0].name}`);
              }}
            >
              Start slideshow
            </button>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <ScrollRestoration />
      <RouteAnnouncer />
    </div>
  );
}
