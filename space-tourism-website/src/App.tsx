import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { ApiEndpoint } from "./pages/api-endpoint";
import { FormValidation } from "./pages/form-validation";
import { NestedRoutes } from "./pages/nested-routes";
import {
  NestedRoutesIndex,
  action as nestedRoutesIndexAction,
  loader as nestedRoutesIndexLoader,
} from "./pages/nested-routes.index";
import {
  NestedRoutesCreate,
  action as nestedRoutesCreateAction,
} from "./pages/nested-routes.create";
import {
  NestedRoutesUpdate,
  loader as nestedRoutesUpdateLoader,
  action as nestedRoutesUpdateAction,
} from "./pages/nested-routes.update.$id";
import { OptimizedImage } from "./pages/optimized-image";

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
