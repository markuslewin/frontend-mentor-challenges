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
import { Icon, IconProps } from "../components/icon";
import { ImgHTMLAttributes, ReactNode } from "react";
import { useMedia } from "../utils/use-media";
import * as Hero from "../components/hero";
import * as Steps from "../components/steps";

export const handle = {
  announcement() {
    return "Home";
  },
} satisfies AnnouncementHandle;

export function HomeRoute() {
  return (
    <div className="center pb-32 tablet:pb-36 desktop:pb-[12.5rem]">
      <div>
        <Hero.Root>
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
            <Hero.Image
              alt=""
              width={heroCoffeepressMobile.width}
              height={heroCoffeepressMobile.height}
              src={heroCoffeepressMobile.src}
            />
          </picture>
          <Hero.Layout>
            <Hero.Text>
              <Hero.Heading>Great coffee made simple.</Hero.Heading>
              <Hero.Body>
                Start your mornings with the world’s best coffees. Try our
                expertly curated artisan coffees from our best roasters
                delivered directly to your door, at your schedule.
              </Hero.Body>
              <CreatePlanButton />
            </Hero.Text>
          </Hero.Layout>
        </Hero.Root>
        <h2 className="text-grey/50 font-fraunces text-title-alternate-big text-center lowercase mt-32 relative -z-10 tablet:mt-36 tablet:pt-7 tablet:pb-5 desktop:mt-[8.3125rem] desktop:pt-[5.375rem] desktop:pb-[2.375rem]">
          Our collection
          <span className="bg-gradient-to-t from-light-cream absolute inset-0" />
        </h2>
        <Center>
          <ul
            className="mt-3 grid gap-12 tablet:-mt-16 desktop:-mt-[4.375rem] desktop:grid-cols-4 desktop:gap-[1.875rem]"
            role="list"
          >
            <CoffeeItem>
              <CoffeeItemText>
                <CoffeeItemHeading>Gran Espresso</CoffeeItemHeading>
                <CoffeeItemDescription>
                  Light and flavorful blend with cocoa and black pepper for an
                  intense experience
                </CoffeeItemDescription>
              </CoffeeItemText>
              <CoffeeItemImage
                alt='todo: Visual description of "Gran Espresso"'
                width={granEspresso.width}
                height={granEspresso.height}
                src={granEspresso.src}
              />
            </CoffeeItem>
            <CoffeeItem>
              <CoffeeItemText>
                <CoffeeItemHeading>Planalto</CoffeeItemHeading>
                <CoffeeItemDescription>
                  Brazilian dark roast with rich and velvety body, and hints of
                  fruits and nuts
                </CoffeeItemDescription>
              </CoffeeItemText>
              <CoffeeItemImage
                alt='todo: Visual description of "Planalto"'
                width={planalto.width}
                height={planalto.height}
                src={planalto.src}
              />
            </CoffeeItem>
            <CoffeeItem>
              <CoffeeItemText>
                <CoffeeItemHeading>Piccollo</CoffeeItemHeading>
                <CoffeeItemDescription>
                  Mild and smooth blend featuring notes of toasted almond and
                  dried cherry
                </CoffeeItemDescription>
              </CoffeeItemText>
              <CoffeeItemImage
                alt='todo: Visual description of "Piccollo"'
                width={piccollo.width}
                height={piccollo.height}
                src={piccollo.src}
              />
            </CoffeeItem>
            <CoffeeItem>
              <CoffeeItemText>
                <CoffeeItemHeading>Danche</CoffeeItemHeading>
                <CoffeeItemDescription>
                  Ethiopian hand-harvested blend densely packed with vibrant
                  fruit notes
                </CoffeeItemDescription>
              </CoffeeItemText>
              <CoffeeItemImage
                alt='todo: Visual description of "Danche"'
                width={danche.width}
                height={danche.height}
                src={danche.src}
              />
            </CoffeeItem>
          </ul>
        </Center>
        <div className="mt-32 grid tablet:mt-36 desktop:mt-[12.5rem]">
          <div className="bg-darker-grey-blue col-start-1 row-start-1 row-span-2 rounded" />
          <div className="text-light-cream text-center col-start-1 row-start-1 pt-16 tablet:pt-14 desktop:pt-[6.25rem]">
            <Center>
              <h2 className="font-fraunces text-h2">Why choose us?</h2>
              <p className="mt-6 mb-16 mx-auto max-w-6 tablet:mb-20 desktop:mt-8 desktop:mb-[5.375rem]">
                A large part of our role is choosing which particular coffees
                will be featured in our range. This means working closely with
                the best coffee growers to give you a more impactful experience
                on every level.
              </p>
            </Center>
          </div>
          <div className="col-start-1 row-start-2 row-span-2">
            <Center>
              <div className="grid auto-rows-fr gap-6 desktop:grid-cols-3 desktop:gap-[1.875rem]">
                <Reason>
                  <ReasonIcon name="icon-coffee-bean" width="73" height="72" />
                  <ReasonText>
                    <ReasonHeading>Best quality</ReasonHeading>
                    <ReasonDescription>
                      Discover an endless variety of the world’s best artisan
                      coffee from each of our roasters.
                    </ReasonDescription>
                  </ReasonText>
                </Reason>
                <Reason>
                  <ReasonIcon name="icon-gift" width="72" height="72" />
                  <ReasonText>
                    <ReasonHeading>Exclusive benefits</ReasonHeading>
                    <ReasonDescription>
                      Special offers and swag when you subscribe, including 30%
                      off your first shipment.
                    </ReasonDescription>
                  </ReasonText>
                </Reason>
                <Reason>
                  <ReasonIcon name="icon-truck" width="72" height="50" />
                  <ReasonText>
                    <ReasonHeading>Free shipping</ReasonHeading>
                    <ReasonDescription>
                      We cover the cost and coffee is delivered fast. Peak
                      freshness: guaranteed.
                    </ReasonDescription>
                  </ReasonText>
                </Reason>
              </div>
            </Center>
          </div>
        </div>
        <div className="grid desktop:grid-cols-[minmax(2.5rem,1fr)_minmax(auto,69.375rem)_minmax(2.5rem,1fr)]">
          <div className="col-start-2 max-w-[65.3125rem]">
            <h2 className="text-grey font-fraunces text-h4 text-center mt-32 tablet:text-start tablet:mt-36 desktop:mt-[12.5rem]">
              How it works
            </h2>
            <div className="mt-20 tablet:mt-10 desktop:mt-20">
              <Steps.Root>
                <Steps.Circles />
                <Steps.Steps>
                  <Steps.Step>
                    <Steps.Number>01</Steps.Number>
                    <Steps.Heading>Pick your coffee</Steps.Heading>
                    <Steps.Description>
                      Select from our evolving range of artisan coffees. Our
                      beans are ethically sourced and we pay fair prices for
                      them. There are new coffees in all profiles every month
                      for you to try out.
                    </Steps.Description>
                  </Steps.Step>
                  <Steps.Step>
                    <Steps.Number>02</Steps.Number>
                    <Steps.Heading>Choose the frequency</Steps.Heading>
                    <Steps.Description>
                      Customize your order frequency, quantity, even your roast
                      style and grind type. Pause, skip or cancel your
                      subscription with no commitment through our online portal.
                    </Steps.Description>
                  </Steps.Step>
                  <Steps.Step>
                    <Steps.Number>03</Steps.Number>
                    <Steps.Heading>Receive and enjoy!</Steps.Heading>
                    <Steps.Description>
                      We ship your package within 48 hours, freshly roasted. Sit
                      back and enjoy award-winning world-class coffees curated
                      to provide a distinct tasting experience.
                    </Steps.Description>
                  </Steps.Step>
                </Steps.Steps>
              </Steps.Root>
            </div>
            <p className="text-center mt-20 tablet:text-start tablet:mt-11 desktop:mt-16">
              <CreatePlanButton />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Center({ children }: { children: ReactNode }) {
  const desktopMatches = useMedia(`(min-width: ${screens.desktop})`);

  return (
    <div
      className="center"
      style={{
        ["--center-size" as string]: desktopMatches
          ? "69.375rem"
          : "35.8125rem",
      }}
    >
      {children}
    </div>
  );
}

function CreatePlanButton() {
  return (
    <Link
      className="bg-dark-cyan text-light-cream font-fraunces font-black text-[1.125rem] leading-[1.5625rem] rounded-xs mt-10 px-8 py-4 inline-block desktop:mt-14 hocus:bg-light-cyan transition-colors"
      to="/plan"
    >
      Create your plan
    </Link>
  );
}

function CoffeeItem({ children }: { children: ReactNode }) {
  return (
    <li className="grid justify-items-center gap-6 tablet:grid-cols-[minmax(0,1fr)_auto] tablet:justify-items-start tablet:gap-9 desktop:grid-cols-none desktop:gap-[4.5rem]">
      {children}
    </li>
  );
}

function CoffeeItemText({ children }: { children: ReactNode }) {
  return (
    <div className="order-2 text-center tablet:text-start tablet:grid tablet:grid-rows-[30fr_auto_auto_58fr] desktop:text-center desktop:block">
      {children}
    </div>
  );
}

function CoffeeItemHeading({ children }: { children: ReactNode }) {
  return <h3 className="row-start-2 font-fraunces text-h4">{children}</h3>;
}

function CoffeeItemDescription({ children }: { children: ReactNode }) {
  return (
    <p className="row-start-3 mt-4 max-w-[17.625rem] tablet:mt-6">{children}</p>
  );
}

function CoffeeItemImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className="order-1 max-w-[12.5rem] pt-[6%] tablet:max-w-[100%]"
      {...props}
    />
  );
}

function Reason({ children }: { children: ReactNode }) {
  return (
    <div className="bg-dark-cyan text-light-cream rounded-sm px-8 pt-20 pb-12 grid justify-items-center gap-14 tablet:px-12 tablet:py-10 tablet:grid-cols-[4.875rem_1fr] tablet:justify-items-start tablet:items-center desktop:grid-cols-none desktop:grid-rows-[auto_1fr] desktop:justify-items-center desktop:items-start">
      {children}
    </div>
  );
}

function ReasonIcon(props: IconProps) {
  return (
    <div className="text-pale-orange size-[4.5rem] grid place-items-center tablet:justify-self-end tablet:size-14 desktop:justify-self-auto desktop:size-[4.5rem]">
      <Icon className="w-full h-auto" {...props} />
    </div>
  );
}

function ReasonText({ children }: { children: ReactNode }) {
  return (
    <div className="text-center tablet:text-start desktop:text-center">
      {children}
    </div>
  );
}

function ReasonHeading({ children }: { children: ReactNode }) {
  return <h3 className="font-fraunces text-h4">{children}</h3>;
}

function ReasonDescription({ children }: { children: ReactNode }) {
  return <p className="mt-6 tablet:mt-4 desktop:mt-6">{children}</p>;
}
