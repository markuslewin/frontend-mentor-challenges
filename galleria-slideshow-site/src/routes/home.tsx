import { Link } from "react-router-dom";
import { paintings } from "../utils/paintings";
import { AnnouncementHandle } from "../components/route-announcer";

export const handle = {
  announcement() {
    return "Home | Galleria";
  },
} satisfies AnnouncementHandle;

export function Home() {
  return (
    <div className="[ home ] [ center ]">
      <h1 className="sr-only">Paintings</h1>
      <ul className="gallery" role="list">
        {paintings.map((painting) => (
          <li className="card" key={painting.name}>
            <div>
              <Link className="card__name" to={`/${painting.name}`}>
                <h2>{painting.name}</h2>
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
