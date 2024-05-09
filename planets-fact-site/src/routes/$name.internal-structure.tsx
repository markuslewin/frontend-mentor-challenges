import { Planet } from "../components/planet";
import { usePlanetContext } from "./$name";

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
