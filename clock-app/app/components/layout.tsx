import { Outlet, ScrollRestoration } from "react-router-dom";
import { RouteAnnouncer } from "#app/components/route-announcer";
import { Announcer } from "#app/components/announcer/announcer";

export function Layout() {
  return (
    <main>
      <Outlet />
      <ScrollRestoration />
      <Announcer />
      <RouteAnnouncer />
    </main>
  );
}
