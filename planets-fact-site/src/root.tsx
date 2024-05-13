import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Layout } from "./components/layout";
import {
  loader as planetLoader,
  handle as planetHandle,
  PlanetRoute,
} from "./routes/$name";
import { PlanetIndexRoute } from "./routes/$name.index";
import {
  PlanetInternalStructureRoute,
  handle as planetInternalStructureHandle,
} from "./routes/$name.internal-structure";
import {
  PlanetSurfaceGeologyRoute,
  handle as planetSurfaceGeologyHandle,
} from "./routes/$name.surface-geology";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader() {
          return redirect("/mercury");
        },
      },
      {
        path: ":name",
        handle: planetHandle,
        loader: planetLoader,
        Component: PlanetRoute,
        children: [
          {
            index: true,
            Component: PlanetIndexRoute,
          },
          {
            path: "internal-structure",
            handle: planetInternalStructureHandle,
            Component: PlanetInternalStructureRoute,
          },
          {
            path: "surface-geology",
            handle: planetSurfaceGeologyHandle,
            Component: PlanetSurfaceGeologyRoute,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
