import { Planet } from "../components/planet";
import { AnnouncementHandle } from "../components/route-announcer";
import { usePlanetContext } from "./$name";

export const handle = {
  announcement() {
    return "Surface geology";
  },
} satisfies AnnouncementHandle;

export function PlanetSurfaceGeologyRoute() {
  const { planet } = usePlanetContext();

  return (
    <Planet
      planet={{
        ...planet,
        content: planet.geology.content,
        source: planet.geology.source,
        image: planet.images.planet,
        popover: planet.images.geology,
      }}
    />
  );
}
