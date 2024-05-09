import { Planet } from "../components/planet";
import { usePlanetContext } from "./$name";

export function PlanetIndexRoute() {
  const { planet } = usePlanetContext();

  return (
    <Planet
      planet={{
        ...planet,
        content: planet.overview.content,
        source: planet.overview.source,
        image: planet.images.planet,
      }}
    />
  );
}
