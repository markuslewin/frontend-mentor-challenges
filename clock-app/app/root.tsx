import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "#app/components/layout";
import { Home } from "#app/routes/home";
import { AnnouncementProvider } from "#app/components/announcer/announcement-provider";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
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
