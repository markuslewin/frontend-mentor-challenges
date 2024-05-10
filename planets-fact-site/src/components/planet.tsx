import { Link } from "react-router-dom";
import { widthByPlanet, type Planet } from "../utils/planets/planets";
import styles from "../routes/$name.module.css";
import { Icon } from "./icon";

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
        {/* todo: `width`, `height` */}
        {typeof planet.image === "string" ? (
          <img
            style={{
              width: `${(widthByPlanet[planet.name] / widthByPlanet.Saturn) * 100}%`,
            }}
            className={styles.image}
            alt={`todo: Visual description of "${planet.name}"`}
            src={planet.image}
          />
        ) : (
          <img
            style={{
              width: `${(widthByPlanet[planet.name] / widthByPlanet.Saturn) * 100}%`,
            }}
            className={styles.image}
            alt={`todo: Visual description of "${planet.name}"`}
            src={planet.image.geology}
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
