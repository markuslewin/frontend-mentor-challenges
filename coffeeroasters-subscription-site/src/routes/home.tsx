// @ts-expect-error Search params
import heroCoffeepressMobile from "../assets/home/mobile/image-hero-coffeepress.jpg?as=metadata";
// @ts-expect-error Search params
import heroCoffeepressTablet from "../assets/home/tablet/image-hero-coffeepress.jpg?as=metadata";
// @ts-expect-error Search params
import heroCoffeepressDesktop from "../assets/home/desktop/image-hero-coffeepress.jpg?as=metadata";
// @ts-expect-error Search params
import granEspresso from "../assets/home/desktop/image-gran-espresso.png?as=metadata";
// @ts-expect-error Search params
import planalto from "../assets/home/desktop/image-planalto.png?as=metadata";
// @ts-expect-error Search params
import piccollo from "../assets/home/desktop/image-piccollo.png?as=metadata";
// @ts-expect-error Search params
import danche from "../assets/home/desktop/image-danche.png?as=metadata";
import { Link } from "react-router-dom";
import { AnnouncementHandle } from "../components/route-announcer";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";

export const handle = {
  announcement() {
    return "Home";
  },
} satisfies AnnouncementHandle;

export function HomeRoute() {
  return (
    <>
      <h1>Great coffee made simple.</h1>
      <p>
        Start your mornings with the world’s best coffees. Try our expertly
        curated artisan coffees from our best roasters delivered directly to
        your door, at your schedule.
      </p>
      <Link to="/plan">Create your plan</Link>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={heroCoffeepressDesktop.width}
          height={heroCoffeepressDesktop.height}
          srcSet={heroCoffeepressDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={heroCoffeepressTablet.width}
          height={heroCoffeepressTablet.height}
          srcSet={heroCoffeepressTablet.src}
        />
        <img
          alt=""
          width={heroCoffeepressMobile.width}
          height={heroCoffeepressMobile.height}
          src={heroCoffeepressMobile.src}
        />
      </picture>
      <h2>Our collection</h2>
      <ul role="list">
        <li>
          <h3>Gran Espresso</h3>
          <p>
            Light and flavorful blend with cocoa and black pepper for an intense
            experience
          </p>
          <img
            alt='todo: Visual description of "Gran Espresso"'
            width={granEspresso.width}
            height={granEspresso.height}
            src={granEspresso.src}
          />
        </li>
        <li>
          <h3>Planalto</h3>
          <p>
            Brazilian dark roast with rich and velvety body, and hints of fruits
            and nuts
          </p>
          <img
            alt='todo: Visual description of "Planalto"'
            width={planalto.width}
            height={planalto.height}
            src={planalto.src}
          />
        </li>
        <li>
          <h3>Piccollo</h3>
          <p>
            Mild and smooth blend featuring notes of toasted almond and dried
            cherry
          </p>
          <img
            alt='todo: Visual description of "Piccollo"'
            width={piccollo.width}
            height={piccollo.height}
            src={piccollo.src}
          />
        </li>
        <li>
          <h3>Danche</h3>
          <p>
            Ethiopian hand-harvested blend densely packed with vibrant fruit
            notes
          </p>
          <img
            alt='todo: Visual description of "Danche"'
            width={danche.width}
            height={danche.height}
            src={danche.src}
          />
        </li>
      </ul>
      <h2>Why choose us?</h2>
      <p>
        A large part of our role is choosing which particular coffees will be
        featured in our range. This means working closely with the best coffee
        growers to give you a more impactful experience on every level.
      </p>
      <Icon name="icon-coffee-bean" />
      <h3>Best quality</h3>
      <p>
        Discover an endless variety of the world’s best artisan coffee from each
        of our roasters.
      </p>
      <Icon name="icon-gift" />
      <h3>Exclusive benefits</h3>
      <p>
        Special offers and swag when you subscribe, including 30% off your first
        shipment.
      </p>
      <Icon name="icon-truck" />
      <h3>Free shipping</h3>
      <p>
        We cover the cost and coffee is delivered fast. Peak freshness:
        guaranteed.
      </p>
      <h2>How it works</h2>
      <ol>
        <li>
          <h3>Pick your coffee</h3>
          <p>
            Select from our evolving range of artisan coffees. Our beans are
            ethically sourced and we pay fair prices for them. There are new
            coffees in all profiles every month for you to try out.
          </p>
        </li>
        <li>
          <h3>Choose the frequency</h3>
          <p>
            Customize your order frequency, quantity, even your roast style and
            grind type. Pause, skip or cancel your subscription with no
            commitment through our online portal.
          </p>
        </li>
        <li>
          <h3>Receive and enjoy!</h3>
          <p>
            We ship your package within 48 hours, freshly roasted. Sit back and
            enjoy award-winning world-class coffees curated to provide a
            distinct tasting experience.
          </p>
        </li>
      </ol>
      <Link to="/plan">Create your plan</Link>
    </>
  );
}
