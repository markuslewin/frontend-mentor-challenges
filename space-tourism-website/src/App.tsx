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
  handle as destinationHandle,
} from "./routes/destination.($slug)";
import {
  CrewRoute,
  loader as crewLoader,
  handle as crewHandle,
} from "./routes/crew.($slug)";
import {
  TechnologyRoute,
  handle as technologyHandle,
  loader as technologyLoader,
} from "./routes/technology.($slug)";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        handle: {
          announcement() {
            return "So, you want to travel to space?";
          },
        },
        Component: Home,
      },
      {
        Component: DestinationLayout,
        children: [
          {
            path: "destination/:slug?",
            handle: destinationHandle,
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
            handle: crewHandle,
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
            handle: technologyHandle,
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
