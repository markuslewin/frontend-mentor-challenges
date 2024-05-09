import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home, handle as homeHandle } from "./routes/home";
import {
  PaintingRoute,
  handle as paintingHandle,
  loader as paintingLoader,
} from "./routes/$paintingName";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        handle: homeHandle,
        Component: Home,
      },
      {
        path: ":paintingName",
        handle: paintingHandle,
        loader: paintingLoader,
        Component: PaintingRoute,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
