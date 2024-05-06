import { Link } from "react-router-dom";
import { paintings } from "../utils/paintings";

export function Home() {
  return (
    <>
      <h1>Paintings</h1>
      <ul role="list">
        {paintings.map((painting) => (
          <li key={painting.name}>
            <Link to={`/${painting.name}`}>
              <h2>{painting.name}</h2>
            </Link>
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
    </>
  );
}
