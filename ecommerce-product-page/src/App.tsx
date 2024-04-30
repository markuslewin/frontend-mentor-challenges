import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./routes/home";
import { ApiEndpoint } from "./routes/api-endpoint";
import { FormValidation } from "./routes/form-validation";
import { NestedRoutes } from "./routes/nested-routes";
import {
  NestedRoutesIndex,
  action as nestedRoutesIndexAction,
  loader as nestedRoutesIndexLoader,
} from "./routes/nested-routes.index";
import {
  NestedRoutesCreate,
  action as nestedRoutesCreateAction,
} from "./routes/nested-routes.create";
import {
  NestedRoutesUpdate,
  loader as nestedRoutesUpdateLoader,
  action as nestedRoutesUpdateAction,
} from "./routes/nested-routes.update.$id";
import { OptimizedImage } from "./routes/optimized-image";

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
            index: true,
            loader: nestedRoutesIndexLoader,
            action: nestedRoutesIndexAction,
            Component: NestedRoutesIndex,
          },
          {
            path: "create",
            action: nestedRoutesCreateAction,
            Component: NestedRoutesCreate,
          },
          {
            path: "update/:id",
            loader: nestedRoutesUpdateLoader,
            action: nestedRoutesUpdateAction,
            Component: NestedRoutesUpdate,
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
