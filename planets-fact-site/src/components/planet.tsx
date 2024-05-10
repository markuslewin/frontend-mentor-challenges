import { Link } from "react-router-dom";
import { Image, widthByPlanet, type Planet } from "../utils/planets/planets";
import styles from "../routes/$name.module.css";
import { Icon } from "./icon";

interface PlanetProps {
  planet: Omit<Planet, "overview" | "structure" | "geology" | "images"> & {
    content: string;
    source: string;
    image: Image;
    popover?: Image;
  };
}

export function Planet({ planet }: PlanetProps) {
  return (
    <>
      <h1
        className={[styles["article__heading"], styles["planet__name"]].join(
          " "
        )}
      >
        {planet.name}
      </h1>
      <div
        className={[styles["article__content"], styles["planet__content"]].join(
          " "
        )}
      >
        <h2 className="sr-only">Description</h2>
        <p>{planet.content}</p>
        <div className={styles["source"]}>
          <h2 className={styles["source__key"]}>Source{"\xa0"}</h2>
          <p className="inline">
            :{" "}
            <Link className={styles["source__value"]} to={planet.source}>
              Wikipedia{" "}
              <Icon className={styles["source__icon"]} name="icon-source" />
            </Link>
          </p>
        </div>
      </div>
      <div className={styles["article__image"]}>
        <h2 className="sr-only">Image</h2>
        <img
          className={styles.image}
          alt={`todo: Visual description of "${planet.name}"`}
          style={{
            width: `${(widthByPlanet[planet.name] / widthByPlanet.Saturn) * 100}%`,
          }}
          src={planet.image.src}
          width={planet.image.width}
          height={planet.image.height}
        />
        {planet.popover && (
          <img
            className="absolute size-16"
            alt={`todo: Visual description of the geology of "${planet.name}"`}
            src={planet.popover.src}
            width={planet.popover.width}
            height={planet.popover.height}
          />
        )}
      </div>
      <div
        className={[styles["article__characteristics"], styles.chars].join(" ")}
      >
        <h2 className="sr-only">Characteristics</h2>
        <div className={styles.char}>
          <h3 className={styles["char__key"]}>Rotation time</h3>
          <p className={styles["char__value"]}>{planet.rotation}</p>
        </div>
        <div className={styles.char}>
          <h3 className={styles["char__key"]}>Revolution time</h3>
          <p className={styles["char__value"]}>{planet.revolution}</p>
        </div>
        <div className={styles.char}>
          <h3 className={styles["char__key"]}>Radius</h3>
          <p className={styles["char__value"]}>{planet.radius}</p>
        </div>
        <div className={styles.char}>
          <h3 className={styles["char__key"]}>Average temp.</h3>
          <p className={styles["char__value"]}>{planet.temperature}</p>
        </div>
      </div>
    </>
  );
}
