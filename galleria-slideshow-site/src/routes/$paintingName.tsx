import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import * as Dialog from "@radix-ui/react-dialog";
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

  const index = paintings.findIndex(
    (p) => p.name.toLowerCase() === paintingName.toLowerCase()
  );
  invariantResponse(index !== -1, "Painting not found", {
    status: 404,
  });

  const previousIndex = index - 1;
  const previousPainting = previousIndex < 0 ? null : paintings[previousIndex];

  const currentPainting = paintings[index];

  const nextIndex = index + 1;
  const nextPainting =
    nextIndex >= paintings.length ? null : paintings[nextIndex];

  return { previousPainting, currentPainting, nextPainting };
}

export function PaintingRoute() {
  const { previousPainting, currentPainting, nextPainting } =
    useLoaderData() as ReturnType<typeof loader>;

  return (
    <article className={styles.route}>
      <header className={styles["current-info"]}>
        <progress className="w-full" />
        <div className="repel center section">
          <div className="stack">
            <p className={styles["current-info__name"]}>
              <span className="sr-only">Painting: </span>
              {currentPainting.name}
            </p>
            <p className={styles["current-info__artist"]}>
              <span className="sr-only">Artist: </span>
              {currentPainting.artist.name}
            </p>
          </div>
          <nav>
            <ul
              className={`[ ${styles["current-info__controls"]} ] [ cluster ]`}
              role="list"
            >
              <li>
                <Link
                  className={styles["current-info__control"]}
                  to={previousPainting ? `/${previousPainting.name}` : "#"}
                  aria-disabled={!previousPainting}
                >
                  <Icon
                    className="icon"
                    name="icon-back-button"
                    width="26"
                    height="24"
                  />
                  <span className="sr-only">Previous painting</span>
                </Link>
              </li>
              <li>
                <Link
                  className={styles["current-info__control"]}
                  to={nextPainting ? `/${nextPainting.name}` : "#"}
                  aria-disabled={!nextPainting}
                >
                  <Icon
                    className="icon"
                    name="icon-next-button"
                    width="26"
                    height="24"
                  />
                  <span className="sr-only">Next painting</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={`[ ${styles.layout} ] [ center ]`}>
        <div className={styles.title}>
          <h1 className={styles["title__name"]}>{currentPainting.name}</h1>
          <p className={styles["title__artist"]}>
            <span className="sr-only">By: </span>
            {currentPainting.artist.name}
          </p>
        </div>
        <img
          className={styles.artist}
          alt=""
          width={currentPainting.artist.image.width}
          height={currentPainting.artist.image.height}
          src={currentPainting.artist.image.src}
        />
        <div className={styles.hero}>
          <picture className={styles["hero__image"]}>
            <source
              media={`(min-width: ${screens.tablet})`}
              width={currentPainting.images.hero.large.width}
              height={currentPainting.images.hero.large.height}
              srcSet={currentPainting.images.hero.large.src}
            />
            <img
              alt={`todo: Visual description of "${currentPainting.name}"`}
              width={currentPainting.images.hero.small.width}
              height={currentPainting.images.hero.small.height}
              src={currentPainting.images.hero.small.src}
            />
          </picture>
          <p className={styles["hero__button-container"]}>
            <Dialog.Root>
              <Dialog.Trigger className={styles["hero__button"]}>
                <Icon
                  className={styles["hero__button-icon"]}
                  name="icon-view-image"
                />
                <span className={styles["hero__button-text"]}>View image</span>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className={styles["lightbox__overlay"]}>
                  <Dialog.Content
                    className={styles["lightbox__content"]}
                    aria-describedby={undefined}
                  >
                    <Dialog.Title className="sr-only">
                      {currentPainting.name}
                    </Dialog.Title>
                    <Dialog.Close className={styles["lightbox__close"]}>
                      Close
                    </Dialog.Close>
                    <img
                      alt={`todo: Visual description of ${currentPainting.name}`}
                      width={currentPainting.images.gallery.width}
                      height={currentPainting.images.gallery.height}
                      src={currentPainting.images.gallery.src}
                    />
                  </Dialog.Content>
                </Dialog.Overlay>
              </Dialog.Portal>
            </Dialog.Root>
          </p>
        </div>
        <div className={styles["description-container"]}>
          <p className={styles["description__year"]}>{currentPainting.year}</p>
          <div className={styles["description__text"]}>
            <p>{currentPainting.description}</p>
            <p className={styles["description__source-container"]}>
              <Link
                className={styles["description__source"]}
                to={currentPainting.source}
              >
                Go to source
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
