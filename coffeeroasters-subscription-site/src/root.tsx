import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { HomeRoute, handle as homeHandle } from "./routes/home";
import { AboutRoute, handle as aboutHandle } from "./routes/about";
import { PlanRoute, handle as planHandle } from "./routes/plan";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        handle: homeHandle,
        Component: HomeRoute,
      },
      {
        path: "about",
        handle: aboutHandle,
        Component: AboutRoute,
      },
      {
        path: "plan",
        handle: planHandle,
        Component: PlanRoute,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
