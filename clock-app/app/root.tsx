import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "#app/components/layout";
import { Home } from "#app/routes/home";
import { AnnouncementProvider } from "#app/components/announcer/announcement-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <AnnouncementProvider>
        <RouterProvider router={router} />
      </AnnouncementProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
