import { IconLuxury, IconSedans, IconSuvs } from "../svgs";

export default function Index() {
  return (
    <main>
      <article>
        <h1 className="sr-only">3-column preview card component</h1>
        <ul>
          {[
            {
              icon: IconSedans,
              title: "Sedans",
              description:
                "Choose a sedan for its affordability and excellent fuel economy. Ideal for cruising in the city or on your next road trip.",
            },
            {
              icon: IconSuvs,
              title: "SUVs",
              description:
                "Take an SUV for its spacious interior, power, and versatility. Perfect for your next family vacation and off-road adventures.",
            },
            {
              icon: IconLuxury,
              title: "Luxury",
              description:
                "Cruise in the best car brands without the bloated prices. Enjoy the enhanced comfort of a luxury rental and arrive in style.",
            },
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <li key={index}>
                <article>
                  <Icon aria-hidden="true" />
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#">Learn more</a>
                </article>
              </li>
            );
          })}
        </ul>
      </article>
    </main>
  );
}
