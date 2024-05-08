import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home, handle as homeHandle } from "./routes/home";
import { ApiEndpoint } from "./routes/api-endpoint";
import { FormValidation } from "./routes/form-validation";
import { NestedRoutes } from "./routes/nested-routes";
import {
  NestedRoutesCreate,
  action as nestedRoutesCreateAction,
} from "./routes/nested-routes.create";
import {
  PaintingRoute,
  handle as paintingHandle,
  loader as paintingLoader,
} from "./routes/$paintingName";
import { OptimizedImage } from "./routes/optimized-image";

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
      {
        path: "api-endpoint",
        Component: ApiEndpoint,
      },
      {
        path: "form-validation",
        Component: FormValidation,
      },
      {
        path: "nested-routes",
        Component: NestedRoutes,
        children: [
          {
            path: "create",
            action: nestedRoutesCreateAction,
            Component: NestedRoutesCreate,
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
