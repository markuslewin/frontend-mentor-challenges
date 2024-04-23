import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./routes/home";
import { OptimizedImage } from "./routes/optimized-image";
import {
  DestinationLayout,
  CrewLayout,
  TechnologyLayout,
} from "./components/sublayout";
import {
  DestinationRoute,
  loader as destinationLoader,
} from "./routes/destination.($slug)";
import { CrewRoute, loader as crewLoader } from "./routes/crew.($slug)";
import {
  TechnologyRoute,
  loader as technologyLoader,
} from "./routes/technology.($slug)";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: DestinationLayout,
        children: [
          {
            path: "destination/:slug?",
            loader: destinationLoader,
            Component: DestinationRoute,
          },
        ],
      },
      {
        Component: CrewLayout,
        children: [
          {
            path: "crew/:slug?",
            loader: crewLoader,
            Component: CrewRoute,
          },
        ],
      },
      {
        Component: TechnologyLayout,
        children: [
          {
            path: "technology/:slug?",
            loader: technologyLoader,
            Component: TechnologyRoute,
          },
        ],
      },
      {
        path: "optimized-image",
        Component: OptimizedImage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
