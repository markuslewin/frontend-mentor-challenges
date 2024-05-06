import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import { paintings } from "../utils/paintings";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";

export function loader({ params }: LoaderFunctionArgs) {
  const { paintingName } = params;
  invariantResponse(
    typeof paintingName === "string",
    "Painting must be a string"
  );

  const painting = paintings.find(
    (p) => p.name.toLowerCase() === paintingName.toLowerCase()
  );
  invariantResponse(painting, "Painting not found", {
    status: 404,
  });

  return { painting };
}

export function PaintingRoute() {
  const { painting } = useLoaderData() as ReturnType<typeof loader>;

  return (
    <article>
      <header>
        <progress />
        <div>
          <p>
            <span>Painting: </span>
            {painting.name}
          </p>
          <p>
            <span>Artist: </span>
            {painting.artist.name}
          </p>
        </div>
        <nav>
          <ul role="list">
            <li>
              <Link to="#" aria-disabled="true">
                <Icon name="icon-back-button" />
                <span>Previous painting</span>
              </Link>
            </li>
            <li>
              <Link to="/Girl with a Pearl Earring">
                <Icon name="icon-next-button" />
                <span>Next painting</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <h1>{painting.name}</h1>
        <p>
          <span>By: </span>
          {painting.artist.name}
        </p>
      </div>
      <img
        alt=""
        width={painting.artist.image.width}
        height={painting.artist.image.height}
        src={painting.artist.image.src}
      />
      <div>
        <picture>
          <source
            media={`(min-width: ${screens.tablet})`}
            width={painting.images.hero.large.width}
            height={painting.images.hero.large.height}
            srcSet={painting.images.hero.large.src}
          />
          <img
            alt={`todo: Visual description of "${painting.name}"`}
            width={painting.images.hero.small.width}
            height={painting.images.hero.small.height}
            src={painting.images.hero.small.src}
          />
        </picture>
        <p>
          <button type="button">
            <Icon name="icon-view-image" /> View image
          </button>
        </p>
      </div>
      <div>
        <p>{painting.year}</p>
        <p>{painting.description}</p>
        <p>
          <Link to={painting.source}>Go to source</Link>
        </p>
      </div>
    </article>
  );
}
