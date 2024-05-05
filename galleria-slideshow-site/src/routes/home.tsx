import { Link } from "react-router-dom";
import { paintings } from "../utils/paintings";

export function Home() {
  return (
    <>
      <h1>Paintings</h1>
      <ul>
        {paintings.map((painting) => (
          <li key={painting.name}>
            <a href={`/${painting.name}`}>
              <h2>{painting.name}</h2>
            </a>
            <p>
              <span>By: </span>
              {painting.artist.name}
            </p>
            <img
              alt={`todo: Visual description of "${painting.name}"`}
              width={painting.images.thumbnail.width}
              height={painting.images.thumbnail.height}
              src={painting.images.thumbnail.src}
            />
          </li>
        ))}
      </ul>
      <p>
        <Link to="/starry night">Starry Night</Link>
      </p>
    </>
  );
}
