import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home, handle as homeHandle } from "./routes/home";
import {
  ApiEndpoint,
  handle as apiEndpointHandler,
} from "./routes/api-endpoint";
import {
  FormValidation,
  handle as formValidationHandle,
} from "./routes/form-validation";
import { NestedRoutes } from "./routes/nested-routes";
import {
  NestedRoutesIndex,
  handle as nestedRoutesIndexHandle,
  action as nestedRoutesIndexAction,
  loader as nestedRoutesIndexLoader,
} from "./routes/nested-routes.index";
import {
  NestedRoutesCreate,
  handle as nestedRoutesCreateHandle,
  action as nestedRoutesCreateAction,
} from "./routes/nested-routes.create";
import {
  NestedRoutesUpdate,
  loader as nestedRoutesUpdateLoader,
  action as nestedRoutesUpdateAction,
  handle as nestedRoutesUpdateHandle,
} from "./routes/nested-routes.update.$id";
import {
  OptimizedImage,
  handle as optimizedImageHandle,
} from "./routes/optimized-image";

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
        path: "api-endpoint",
        handle: apiEndpointHandler,
        Component: ApiEndpoint,
      },
      {
        path: "form-validation",
        handle: formValidationHandle,
        Component: FormValidation,
      },
      {
        path: "nested-routes",
        Component: NestedRoutes,
        children: [
          {
            index: true,
            handle: nestedRoutesIndexHandle,
            loader: nestedRoutesIndexLoader,
            action: nestedRoutesIndexAction,
            Component: NestedRoutesIndex,
          },
          {
            path: "create",
            handle: nestedRoutesCreateHandle,
            action: nestedRoutesCreateAction,
            Component: NestedRoutesCreate,
          },
          {
            path: "update/:id",
            handle: nestedRoutesUpdateHandle,
            loader: nestedRoutesUpdateLoader,
            action: nestedRoutesUpdateAction,
            Component: NestedRoutesUpdate,
          },
        ],
      },
      {
        path: "optimized-image",
        handle: optimizedImageHandle,
        Component: OptimizedImage,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
