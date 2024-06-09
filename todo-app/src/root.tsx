import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./routes/app";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
