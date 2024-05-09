import { Link } from "react-router-dom";
import type { Planet } from "../utils/planets/planets";

interface PlanetProps {
  planet: Omit<Planet, "overview" | "structure" | "geology" | "images"> & {
    content: string;
    source: string;
    image: string | { planet: string; geology: string };
  };
}

export function Planet({ planet }: PlanetProps) {
  return (
    <>
      <h1 className="font-antonio text-h1">{planet.name}</h1>
      <h2>Description</h2>
      <p>{planet.content}</p>
      <h2>Source</h2>
      <p>
        : <Link to={planet.source}>Wikipedia</Link>
      </p>
      <h2>Image</h2>
      {/* todo: `width`, `height` */}
      {typeof planet.image === "string" ? (
        <img
          alt={`todo: Visual description of "${planet.name}"`}
          src={planet.image}
        />
      ) : (
        <img
          alt={`todo: Visual description of "${planet.name}"`}
          src={planet.image.geology}
        />
      )}
      <h2>Characteristics</h2>
      <h3>Rotation time</h3>
      <p>{planet.rotation}</p>
      <h3>Revolution time</h3>
      <p>{planet.revolution}</p>
      <h3>Radius</h3>
      <p>{planet.radius}</p>
      <h3>Average temp.</h3>
      <p>{planet.temperature}</p>
    </>
  );
}
