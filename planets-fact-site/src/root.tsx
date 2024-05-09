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
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
