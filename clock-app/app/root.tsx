import { Home } from "#app/routes/home";
import { AnnouncementProvider } from "#app/components/announcer/announcement-provider";
import { Announcer } from "#app/components/announcer/announcer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnnouncementProvider>
        <Home />
        <Announcer />
      </AnnouncementProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
