// @ts-expect-error Search params
import heroBlackcupMobile from "../assets/plan/mobile/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupTablet from "../assets/plan/tablet/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupDesktop from "../assets/plan/desktop/image-hero-blackcup.jpg?as=metadata";
import { useId } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioCard from "../components/radio-card";
import * as Hero from "../components/hero";
import { AnnouncementHandle } from "../components/route-announcer";
import { screens } from "../utils/screens";

export const handle = {
  announcement() {
    return "Plan";
  },
} satisfies AnnouncementHandle;

export function PlanRoute() {
  const progressHeadingId = useId();

  const orderHeadingId = useId();
  const preferencesHeadingId = useId();
  const beanTypeHeadingId = useId();
  const quantityHeadingId = useId();
  const grindOptionHeadingId = useId();
  const deliveriesHeadingId = useId();

  const checkoutHeadingId = useId();

  return (
    <div className="pb-32 tablet:pb-36 desktop:pb-[10.5rem]">
      <div className="t-center-outer px-gutter">
        <Hero.Root>
          <picture>
            <source
              media={`(min-width: ${screens.desktop})`}
              width={heroBlackcupDesktop.width}
              height={heroBlackcupDesktop.height}
              srcSet={heroBlackcupDesktop.src}
            />
            <source
              media={`(min-width: ${screens.tablet})`}
              width={heroBlackcupTablet.width}
              height={heroBlackcupTablet.height}
              srcSet={heroBlackcupTablet.src}
            />
            <Hero.Image
              alt=""
              width={heroBlackcupMobile.width}
              height={heroBlackcupMobile.height}
              src={heroBlackcupMobile.src}
            />
          </picture>
          <Hero.Layout>
            <Hero.Text>
              <Hero.Heading>Create a plan</Hero.Heading>
              <Hero.Body>
                Build a subscription plan that best fits your needs. We offer an
                assortment of the best artisan coffees from around the globe
                delivered fresh to your door.
              </Hero.Body>
            </Hero.Text>
          </Hero.Layout>
        </Hero.Root>
      </div>
      <h2>How it works</h2>
      <ol>
        <li>
          <h3>Pick your coffee</h3>
          <p>
            Select from our evolving range of artisan coffees. Our beans are
            ethically sourced and we pay fair prices for them. There's new
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
      <h2>Order</h2>
      <section aria-labelledby={progressHeadingId}>
        <h3 id={progressHeadingId}>Order progress</h3>
        {/* todo: Nav? */}
        <ol>
          <li>
            <a href={`#${preferencesHeadingId}`}>Preferences</a>
          </li>
          <li>
            <a href={`#${beanTypeHeadingId}`}>Bean type</a>
          </li>
          <li>
            <a href={`#${quantityHeadingId}`}>Quantity</a>
          </li>
          <li>
            <a href={`#${grindOptionHeadingId}`}>Grind option</a>
          </li>
          <li>
            <a href={`#${deliveriesHeadingId}`}>Deliveries</a>
          </li>
        </ol>
      </section>
      <section aria-labelledby={orderHeadingId}>
        <h3 id={orderHeadingId}>Order options</h3>
        <Collapsible.Root>
          <h4 id={preferencesHeadingId}>
            <Collapsible.Trigger>
              How do you drink your coffee?
            </Collapsible.Trigger>
          </h4>
          <Collapsible.Content>
            <fieldset aria-labelledby={preferencesHeadingId}>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="preferences" value="capsule" />
                  Capsule
                </RadioCard.Label>
                <RadioCard.Description>
                  Compatible with Nespresso systems and similar brewers
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="preferences" value="filter" />
                  Filter
                </RadioCard.Label>
                <RadioCard.Description>
                  For pour over or drip methods like Aeropress, Chemex, and V60
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="preferences" value="espresso" />
                  Espresso
                </RadioCard.Label>
                <RadioCard.Description>
                  Dense and finely ground beans for an intense, flavorful
                  experience
                </RadioCard.Description>
              </RadioCard.Root>
            </fieldset>
          </Collapsible.Content>
        </Collapsible.Root>
        <Collapsible.Root>
          <h4 id={beanTypeHeadingId}>
            <Collapsible.Trigger>What type of coffee?</Collapsible.Trigger>
          </h4>
          <Collapsible.Content>
            <fieldset aria-labelledby={beanTypeHeadingId}>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="bean-type" value="single-origin" />
                  Single origin
                </RadioCard.Label>
                <RadioCard.Description>
                  Distinct, high quality coffee from a specific family-owned
                  farm
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="bean-type" value="decaf" />
                  Decaf
                </RadioCard.Label>
                <RadioCard.Description>
                  Just like regular coffee, except the caffeine has been removed
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="bean-type" value="blended" />
                  Blended
                </RadioCard.Label>
                <RadioCard.Description>
                  Combination of two or three dark roasted beans of organic
                  coffees
                </RadioCard.Description>
              </RadioCard.Root>
            </fieldset>
          </Collapsible.Content>
        </Collapsible.Root>
        <Collapsible.Root>
          <h4 id={quantityHeadingId}>
            <Collapsible.Trigger>How much would you like?</Collapsible.Trigger>
          </h4>
          <Collapsible.Content>
            <fieldset aria-labelledby={quantityHeadingId}>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="quantity" value="250g" />
                  250g
                </RadioCard.Label>
                <RadioCard.Description>
                  Perfect for the solo drinker. Yields about 12 delicious cups.
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="quantity" value="500g" />
                  500g
                </RadioCard.Label>
                <RadioCard.Description>
                  Perfect option for a couple. Yields about 40 delectable cups.
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="quantity" value="1000g" />
                  1000g
                </RadioCard.Label>
                <RadioCard.Description>
                  Perfect for offices and events. Yields about 90 delightful
                  cups.
                </RadioCard.Description>
              </RadioCard.Root>
            </fieldset>
          </Collapsible.Content>
        </Collapsible.Root>
        <Collapsible.Root>
          <h4 id={grindOptionHeadingId}>
            <Collapsible.Trigger>Want us to grind them?</Collapsible.Trigger>
          </h4>
          <Collapsible.Content>
            <fieldset aria-labelledby={grindOptionHeadingId}>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="grind-option" value="wholebean" />
                  Wholebean
                </RadioCard.Label>
                <RadioCard.Description>
                  Best choice if you cherish the full sensory experience
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="grind-option" value="filter" />
                  Filter
                </RadioCard.Label>
                <RadioCard.Description>
                  For drip or pour-over coffee methods such as V60 or Aeropress
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="grind-option" value="cafetiére" />
                  Cafetiére
                </RadioCard.Label>
                <RadioCard.Description>
                  Course ground beans specially suited for french press coffee
                </RadioCard.Description>
              </RadioCard.Root>
            </fieldset>
          </Collapsible.Content>
        </Collapsible.Root>
        <Collapsible.Root>
          <h4 id={deliveriesHeadingId}>
            <Collapsible.Trigger>
              How often should we deliver?
            </Collapsible.Trigger>
          </h4>
          <Collapsible.Content>
            <fieldset aria-labelledby={deliveriesHeadingId}>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="deliveries" value="every-week" />
                  Every week
                </RadioCard.Label>
                <RadioCard.Description>
                  $14.00 per shipment. Includes free first-class shipping.
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="deliveries" value="every-2-weeks" />
                  Every 2 weeks
                </RadioCard.Label>
                <RadioCard.Description>
                  $17.25 per shipment. Includes free priority shipping.
                </RadioCard.Description>
              </RadioCard.Root>
              <RadioCard.Root>
                <RadioCard.Label>
                  <RadioCard.Input name="deliveries" value="every-month" />
                  Every month
                </RadioCard.Label>
                <RadioCard.Description>
                  $22.50 per shipment. Includes free priority shipping.
                </RadioCard.Description>
              </RadioCard.Root>
            </fieldset>
          </Collapsible.Content>
        </Collapsible.Root>
      </section>
      <section aria-labelledby={checkoutHeadingId}>
        <h3 id={checkoutHeadingId}>Checkout</h3>
        <h4>Order summary</h4>
        <Summary />
        <h4>Submit order</h4>
        <Dialog.Root>
          <Dialog.Trigger aria-disabled="true">Create my plan!</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content aria-labelledby={undefined}>
                {/* todo: Focus title on open */}
                <Dialog.Title>Order summary</Dialog.Title>
                <Summary />
                <p>
                  Is this correct? You can proceed to checkout or go back to
                  plan selection if something is off. Subscription discount
                  codes can also be redeemed at the checkout.
                </p>
                <p>
                  <strong>$14.00 / mo</strong>
                </p>
                <Dialog.Close>Checkout</Dialog.Close>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      </section>
    </div>
  );
}

function Summary() {
  // todo: Blockquote..?
  // todo: `b` or `strong`
  return (
    <p>
      “I drink coffee <Blank />, with a <Blank /> type of bean. <Blank /> ground
      ala <Blank />, sent to me <Blank />
      .”
    </p>
  );
}

function Blank() {
  return (
    <>
      <span aria-hidden="true">_____</span>
      <span className="sr-only">blank</span>
    </>
  );
}
