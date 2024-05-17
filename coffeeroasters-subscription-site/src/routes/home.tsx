import { AnnouncementHandle } from "../components/route-announcer";

export const handle = {
  announcement() {
    return "Home";
  },
} satisfies AnnouncementHandle;

export function Home() {
  return (
    <>
      <h1 className="text-heading-l">My React template</h1>
      <p className="mt-8">This is my React template.</p>
    </>
  );
}
