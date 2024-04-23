import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./routes/home";
import { OptimizedImage } from "./routes/optimized-image";
import { DestinationLayout } from "./components/destination-layout";
import { CrewRoute } from "./routes/crew";
import { TechnologyRoute } from "./routes/technology";
import {
  DestinationRoute,
  loader as destinationLoader,
} from "./routes/destination.($slug)";
import { TechnologyLaunchVehicleRoute } from "./routes/technology.launch-vehicle";
import { TechnologySpaceportRoute } from "./routes/technology.spaceport";
import { TechnologySpaceCapsuleRoute } from "./routes/technology.space-capsule";
import { CrewAnoushehAnsariRoute } from "./routes/crew.anousheh-ansari";
import { CrewVictorGloverRoute } from "./routes/crew.victor-glover";
import { CrewMarkShuttleworthRoute } from "./routes/crew.mark-shuttleworth";
import { CrewDouglasHurleyRoute } from "./routes/crew.douglas-hurley";

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
        path: "crew",
        Component: CrewRoute,
        children: [
          {
            // todo: Douglas Hurley
            index: true,
            Component: CrewDouglasHurleyRoute,
          },
          {
            path: "mark-shuttleworth",
            Component: CrewMarkShuttleworthRoute,
          },
          {
            path: "victor-glover",
            Component: CrewVictorGloverRoute,
          },
          {
            path: "anousheh-ansari",
            Component: CrewAnoushehAnsariRoute,
          },
        ],
      },
      {
        path: "technology",
        Component: TechnologyRoute,
        children: [
          {
            // todo: launch-vehicle
            index: true,
            Component: TechnologyLaunchVehicleRoute,
          },
          {
            path: "spaceport",
            Component: TechnologySpaceportRoute,
          },
          {
            path: "space-capsule",
            Component: TechnologySpaceCapsuleRoute,
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
