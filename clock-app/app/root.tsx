import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "#app/components/layout";
import { Home, handle as homeHandle } from "#app/routes/home";
import { NestedRoutes } from "#app/routes/nested-routes";
import {
  NestedRoutesIndex,
  handle as nestedRoutesIndexHandle,
  action as nestedRoutesIndexAction,
  loader as nestedRoutesIndexLoader,
} from "#app/routes/nested-routes.index";
import {
  NestedRoutesCreate,
  handle as nestedRoutesCreateHandle,
  action as nestedRoutesCreateAction,
} from "#app/routes/nested-routes.create";
import {
  NestedRoutesUpdate,
  loader as nestedRoutesUpdateLoader,
  action as nestedRoutesUpdateAction,
  handle as nestedRoutesUpdateHandle,
} from "#app/routes/nested-routes.update.$id";
import { AnnouncementProvider } from "#app/components/announcer/announcement-provider";

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
    ],
  },
]);

function App() {
  return (
    <AnnouncementProvider>
      <RouterProvider router={router} />
    </AnnouncementProvider>
  );
}

export default App;
