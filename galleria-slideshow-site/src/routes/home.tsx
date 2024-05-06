import { Link } from "react-router-dom";
import { paintings } from "../utils/paintings";

export function Home() {
  return (
    <div className="[ home ] [ center ]">
      <h1 className="sr-only">Paintings</h1>
      <ul className="gallery" role="list">
        {paintings.map((painting) => (
          <li className="card" key={painting.name}>
            <div>
              <Link to={`/${painting.name}`}>
                <h2 className="card__name">{painting.name}</h2>
              </Link>
              <p className="card__artist">
                <span className="sr-only">By: </span>
                {painting.artist.name}
              </p>
            </div>
            <img
              className="card__painting"
              alt={`todo: Visual description of "${painting.name}"`}
              width={painting.images.thumbnail.width}
              height={painting.images.thumbnail.height}
              src={painting.images.thumbnail.src}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
