import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import { paintings } from "../utils/paintings";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";
import styles from "./$paintingName.module.css";

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
    <div className={`[ ${styles.route} ] [ center ]`}>
      <article className={styles.layout}>
        {/* <header>
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
          </header> */}
        <div className={styles.title}>
          <h1 className={styles["title__name"]}>{painting.name}</h1>
          <p className={styles["title__artist"]}>
            <span className="sr-only">By: </span>
            {painting.artist.name}
          </p>
        </div>
        <img
          className={styles.artist}
          alt=""
          width={painting.artist.image.width}
          height={painting.artist.image.height}
          src={painting.artist.image.src}
        />
        <div className={styles.hero}>
          <picture className={styles["hero__image"]}>
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
          <p className={styles["hero__button-container"]}>
            <button className={styles["hero__button"]} type="button">
              <Icon
                className={styles["hero__button-icon"]}
                name="icon-view-image"
              />
              <span className={styles["hero__button-text"]}>View image</span>
            </button>
          </p>
        </div>
        <div className={styles["description-container"]}>
          <p className={styles["description__year"]}>{painting.year}</p>
          <div className={styles["description__text"]}>
            <p>{painting.description}</p>
            <p className={styles["description__source-container"]}>
              <Link
                className={styles["description__source"]}
                to={painting.source}
              >
                Go to source
              </Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
