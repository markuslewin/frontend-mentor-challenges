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
import { PlanetInternalStructureRoute } from "./routes/$name.internal-structure";
import { PlanetSurfaceGeologyRoute } from "./routes/$name.surface-geology";

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
          { index: true, Component: PlanetIndexRoute },
          {
            path: "internal-structure",
            Component: PlanetInternalStructureRoute,
          },
          { path: "surface-geology", Component: PlanetSurfaceGeologyRoute },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
