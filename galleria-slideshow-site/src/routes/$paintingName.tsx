import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { invariantResponse } from "@epic-web/invariant";
import * as Dialog from "@radix-ui/react-dialog";
import { paintings } from "../utils/paintings";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";
import styles from "./$paintingName.module.css";
import { flushSync } from "react-dom";
import { AnnouncementHandle } from "../components/route-announcer";
import { SlideshowHandle } from "../utils/slideshow";
import { useId } from "react";

type LoaderData = ReturnType<typeof loader>;

export const handle = {
  announcement(data) {
    return data.currentPainting.name;
  },
  isSlideshow: true,
} satisfies AnnouncementHandle<LoaderData> & SlideshowHandle;

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

  return {
    previousPainting,
    currentPainting: { ...currentPainting, index },
    nextPainting,
  };
}

export function PaintingRoute() {
  const { previousPainting, currentPainting, nextPainting } =
    useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const controlsHeadingId = useId();

  return (
    <article className={styles.route}>
      <header className={styles["current-info"]}>
        <h2 className="sr-only">Slideshow</h2>
        <div
          className={styles["progress-root"]}
          style={{
            ["--progress-value" as string]:
              (currentPainting.index + 1) / paintings.length,
          }}
        >
          <div className={styles["progress-indicator"]}>
            <h3 className="sr-only">Progress</h3>
            <p className="sr-only" aria-live="polite">
              Painting {currentPainting.index + 1} out of {paintings.length}
            </p>
          </div>
        </div>
        <div className="repel center section">
          <div className="stack">
            <h3 className="sr-only">Painting</h3>
            <p className={styles["current-info__name"]}>
              {currentPainting.name}
            </p>
            <h3 className="sr-only">Artist</h3>
            <p className={styles["current-info__artist"]}>
              {currentPainting.artist.name}
            </p>
          </div>
          <nav aria-labelledby={controlsHeadingId}>
            <h3 className="sr-only" id={controlsHeadingId}>
              Controls
            </h3>
            <ul
              className={`[ ${styles["current-info__controls"]} ] [ cluster ]`}
              role="list"
            >
              <li>
                <button
                  className={styles["current-info__control"]}
                  type="button"
                  onClick={() => {
                    if (previousPainting) {
                      flushSync(() => {
                        navigate(`/${previousPainting.name}`, {
                          preventScrollReset: true,
                        });
                      });
                      scrollTo(0, document.body.scrollHeight);
                    }
                  }}
                  aria-disabled={!previousPainting}
                >
                  <Icon
                    className="icon"
                    name="icon-back-button"
                    width="26"
                    height="24"
                  />
                  <span className="sr-only">Previous painting</span>
                </button>
              </li>
              <li>
                <button
                  className={styles["current-info__control"]}
                  type="button"
                  onClick={() => {
                    if (nextPainting) {
                      flushSync(() => {
                        navigate(`/${nextPainting.name}`, {
                          preventScrollReset: true,
                        });
                      });
                      scrollTo(0, document.body.scrollHeight);
                    }
                  }}
                  aria-disabled={!nextPainting}
                >
                  <Icon
                    className="icon"
                    name="icon-next-button"
                    width="26"
                    height="24"
                  />
                  <span className="sr-only">Next painting</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div>
        <div className={`[ ${styles.layout} ] [ center ]`}>
          <div className={styles.title}>
            <h1 className={styles["title__name"]}>{currentPainting.name}</h1>
            <h2 className="sr-only">Artist</h2>
            <p className={styles["title__artist"]}>
              {currentPainting.artist.name}
            </p>
          </div>
          <img
            key={currentPainting.name}
            className={styles.artist}
            alt=""
            width={currentPainting.artist.image.width}
            height={currentPainting.artist.image.height}
            src={currentPainting.artist.image.src}
          />
          <div className={styles.hero}>
            <h2 className="sr-only">Image</h2>
            <picture
              key={currentPainting.name}
              className={styles["hero__image"]}
            >
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
                  <span className={styles["hero__button-text"]}>
                    View image
                  </span>
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
            <h2 className="sr-only">Year</h2>
            <p className={styles["description__year"]}>
              {currentPainting.year}
            </p>
            <div className={styles["description__text"]}>
              <h2 className="sr-only">Description</h2>
              <p>{currentPainting.description}</p>
              <h2 className="sr-only">Source</h2>
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
      </div>
    </article>
  );
}
