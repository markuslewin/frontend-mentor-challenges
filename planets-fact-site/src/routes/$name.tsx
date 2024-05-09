import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import { AnnouncementHandle } from "../components/route-announcer";

type LoaderData = ReturnType<typeof loader>;

export const handle = {
  announcement(data) {
    return data.name;
  },
} satisfies AnnouncementHandle<LoaderData>;

export function loader({ params }: LoaderFunctionArgs) {
  const { name } = params;
  invariantResponse(typeof name === "string", "Name must be a string");

  // const planet = planets.find
  // invariantResponse(message, "Planet not found", { status: 404 });

  return { name };
}

export function PlanetRoute() {
  const { name } = useLoaderData() as LoaderData;

  return (
    <>
      <h1>{name}</h1>
    </>
  );
}
