import { IconLuxury, IconSedans, IconSuvs } from "../svgs";

export default function Index() {
  return (
    <main>
      <article>
        <h1 className="sr-only">3-column preview card component</h1>
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul className="switcher" role="list">
          {[
            {
              icon: IconSedans,
              title: "Sedans",
              description:
                "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
              utility: "card-color-bright-orange",
            },
            {
              icon: IconSuvs,
              title: "SUVs",
              description:
                "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
              utility: "card-color-dark-cyan",
            },
            {
              icon: IconLuxury,
              title: "Luxury",
              description:
                "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
              utility: "card-color-very-dark-cyan",
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <li key={index}>
                <article
                  className={`[ card ] [ flow ] [ ${card.utility} ]`}
                  data-flow-split="3"
                >
                  <Icon aria-hidden="true" />
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  <p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="button" href="#">
                      Learn more
                    </a>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
