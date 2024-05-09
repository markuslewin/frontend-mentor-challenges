import { Planet } from "../components/planet";
import { usePlanetContext } from "./$name";

export function PlanetSurfaceGeologyRoute() {
  const { planet } = usePlanetContext();

  return (
    <Planet
      planet={{
        ...planet,
        content: planet.geology.content,
        source: planet.geology.source,
        image: {
          geology: planet.images.geology,
          planet: planet.images.planet,
        },
      }}
    />
  );
}
