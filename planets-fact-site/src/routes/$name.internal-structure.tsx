import { Planet } from "../components/planet";
import { AnnouncementHandle } from "../components/route-announcer";
import { usePlanetContext } from "./$name";

export const handle = {
  announcement() {
    return "Internal structure";
  },
} satisfies AnnouncementHandle;

export function PlanetInternalStructureRoute() {
  const { planet } = usePlanetContext();

  return (
    <Planet
      planet={{
        ...planet,
        content: planet.structure.content,
        source: planet.structure.source,
        image: planet.images.internal,
      }}
    />
  );
}
