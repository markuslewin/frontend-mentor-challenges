// @ts-expect-error Search params
import heroBlackcupMobile from "../assets/plan/mobile/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupTablet from "../assets/plan/tablet/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupDesktop from "../assets/plan/desktop/image-hero-blackcup.jpg?as=metadata";
import {
  AnchorHTMLAttributes,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useId,
  useState,
} from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioCard from "../components/radio-card";
import * as Hero from "../components/hero";
import * as Steps from "../components/steps";
import { AnnouncementHandle } from "../components/route-announcer";
import { screens } from "../utils/screens";
import { Button } from "../components/button";
import { Icon } from "../components/icon";
import { VariantProps, cva, cx } from "class-variance-authority";

export const handle = {
  announcement() {
    return "Plan";
  },
} satisfies AnnouncementHandle;

interface CoffeeFormData {
  preferences: "capsule" | "filter" | "espresso" | null;
  "bean-type": "single-origin" | "decaf" | "blended" | null;
  quantity: "250g" | "500g" | "1000g" | null;
  "grind-option": "wholebean" | "filter" | "cafetiére" | null;
  deliveries: "every-week" | "every-2-weeks" | "every-month" | null;
}

export function PlanRoute() {
  const progressHeadingId = useId();

  const orderHeadingId = useId();
  const preferencesHeadingId = useId();
  const beanTypeHeadingId = useId();
  const quantityHeadingId = useId();
  const grindOptionHeadingId = useId();
  const deliveriesHeadingId = useId();

  const checkoutHeadingId = useId();

  const [formData, setFormData] = useState<CoffeeFormData>({
    preferences: null,
    "bean-type": null,
    quantity: null,
    "grind-option": null,
    deliveries: null,
  });

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
      <div className="mt-32 t-center-outer tablet:mt-36 desktop:mt-[10.5rem] desktop:px-gutter">
        <div className="bg-darker-grey-blue text-light-cream rounded py-20 tablet:pt-24 tablet:pb-20 desktop:py-[6.25rem]">
          <div className="t-center-inner px-gutter">
            <h2 className="sr-only">How it works</h2>
            <Steps.Root>
              <Steps.Circles theme="dark" />
              <Steps.Steps>
                <Steps.Step>
                  <Steps.Number>01</Steps.Number>
                  <Steps.Heading>Pick your coffee</Steps.Heading>
                  <Steps.Description>
                    Select from our evolving range of artisan coffees. Our beans
                    are ethically sourced and we pay fair prices for them. There
                    are new coffees in all profiles every month for you to try
                    out.
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
                    back and enjoy award-winning world-class coffees curated to
                    provide a distinct tasting experience.
                  </Steps.Description>
                </Steps.Step>
              </Steps.Steps>
            </Steps.Root>
          </div>
        </div>
      </div>
      <div className="t-center-inner layout-grid mt-32 px-gutter tablet:mt-36 desktop:mt-[10.5rem]">
        <h2 className="sr-only">Order</h2>
        <section
          className="col-start-1 col-span-5 hidden desktop:block"
          aria-labelledby={progressHeadingId}
        >
          <h3 className="sr-only" id={progressHeadingId}>
            Order progress
          </h3>
          {/* todo: Nav? */}
          <ol className="font-fraunces text-h4">
            <ProgressItem>
              <ProgressLink href={`#${preferencesHeadingId}`} variant="active">
                <ProgressNumber>01</ProgressNumber> Preferences
              </ProgressLink>
            </ProgressItem>
            <ProgressItem>
              <ProgressLink href={`#${beanTypeHeadingId}`} variant="inactive">
                <ProgressNumber>02</ProgressNumber> Bean type
              </ProgressLink>
            </ProgressItem>
            <ProgressItem>
              <ProgressLink href={`#${quantityHeadingId}`} variant="inactive">
                <ProgressNumber>03</ProgressNumber> Quantity
              </ProgressLink>
            </ProgressItem>
            <ProgressItem>
              <ProgressLink
                href={`#${grindOptionHeadingId}`}
                variant="disabled"
              >
                <ProgressNumber>04</ProgressNumber> Grind option
              </ProgressLink>
            </ProgressItem>
            <ProgressItem>
              <ProgressLink href={`#${deliveriesHeadingId}`} variant="inactive">
                <ProgressNumber>05</ProgressNumber> Deliveries
              </ProgressLink>
            </ProgressItem>
          </ol>
        </section>
        <div className="col-span-full desktop:col-start-9 desktop:col-end-[-1]">
          <section
            className="grid gap-24 desktop:gap-[5.5rem]"
            aria-labelledby={orderHeadingId}
          >
            <h3 className="sr-only" id={orderHeadingId}>
              Order options
            </h3>
            <Question>
              <QuestionHeading id={preferencesHeadingId}>
                How do you drink your coffee? <QuestionArrow />
              </QuestionHeading>
              <QuestionContent>
                <QuestionFieldset aria-labelledby={preferencesHeadingId}>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="preferences"
                        value="capsule"
                        checked={formData.preferences === "capsule"}
                        onChange={() =>
                          setFormData({ ...formData, preferences: "capsule" })
                        }
                      />
                      Capsule
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Compatible with Nespresso systems and similar brewers
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="preferences"
                        value="filter"
                        checked={formData.preferences === "filter"}
                        onChange={() =>
                          setFormData({ ...formData, preferences: "filter" })
                        }
                      />
                      Filter
                    </RadioCard.Label>
                    <RadioCard.Description>
                      For pour over or drip methods like Aeropress, Chemex, and
                      V60
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="preferences"
                        value="espresso"
                        checked={formData.preferences === "espresso"}
                        onChange={() =>
                          setFormData({ ...formData, preferences: "espresso" })
                        }
                      />
                      Espresso
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Dense and finely ground beans for an intense, flavorful
                      experience
                    </RadioCard.Description>
                  </RadioCard.Root>
                </QuestionFieldset>
              </QuestionContent>
            </Question>
            <Question>
              <QuestionHeading id={beanTypeHeadingId}>
                What type of coffee? <QuestionArrow />
              </QuestionHeading>
              <QuestionContent>
                <QuestionFieldset aria-labelledby={beanTypeHeadingId}>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="bean-type"
                        value="single-origin"
                        checked={formData["bean-type"] === "single-origin"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            "bean-type": "single-origin",
                          })
                        }
                      />
                      Single origin
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Distinct, high quality coffee from a specific family-owned
                      farm
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="bean-type"
                        value="decaf"
                        checked={formData["bean-type"] === "decaf"}
                        onChange={() =>
                          setFormData({ ...formData, "bean-type": "decaf" })
                        }
                      />
                      Decaf
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Just like regular coffee, except the caffeine has been
                      removed
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="bean-type"
                        value="blended"
                        checked={formData["bean-type"] === "blended"}
                        onChange={() =>
                          setFormData({ ...formData, "bean-type": "blended" })
                        }
                      />
                      Blended
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Combination of two or three dark roasted beans of organic
                      coffees
                    </RadioCard.Description>
                  </RadioCard.Root>
                </QuestionFieldset>
              </QuestionContent>
            </Question>
            <Question>
              <QuestionHeading id={quantityHeadingId}>
                How much would you like? <QuestionArrow />
              </QuestionHeading>
              <QuestionContent>
                <QuestionFieldset aria-labelledby={quantityHeadingId}>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="quantity"
                        value="250g"
                        checked={formData.quantity === "250g"}
                        onChange={() =>
                          setFormData({ ...formData, quantity: "250g" })
                        }
                      />
                      250g
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Perfect for the solo drinker. Yields about 12 delicious
                      cups.
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="quantity"
                        value="500g"
                        checked={formData.quantity === "500g"}
                        onChange={() =>
                          setFormData({ ...formData, quantity: "500g" })
                        }
                      />
                      500g
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Perfect option for a couple. Yields about 40 delectable
                      cups.
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="quantity"
                        value="1000g"
                        checked={formData.quantity === "1000g"}
                        onChange={() =>
                          setFormData({ ...formData, quantity: "1000g" })
                        }
                      />
                      1000g
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Perfect for offices and events. Yields about 90 delightful
                      cups.
                    </RadioCard.Description>
                  </RadioCard.Root>
                </QuestionFieldset>
              </QuestionContent>
            </Question>
            <Question>
              <QuestionHeading id={grindOptionHeadingId}>
                Want us to grind them? <QuestionArrow />
              </QuestionHeading>
              <QuestionContent>
                <QuestionFieldset aria-labelledby={grindOptionHeadingId}>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="grind-option"
                        value="wholebean"
                        checked={formData["grind-option"] === "wholebean"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            "grind-option": "wholebean",
                          })
                        }
                      />
                      Wholebean
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Best choice if you cherish the full sensory experience
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="grind-option"
                        value="filter"
                        checked={formData["grind-option"] === "filter"}
                        onChange={() =>
                          setFormData({ ...formData, "grind-option": "filter" })
                        }
                      />
                      Filter
                    </RadioCard.Label>
                    <RadioCard.Description>
                      For drip or pour-over coffee methods such as V60 or
                      Aeropress
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="grind-option"
                        value="cafetiére"
                        checked={formData["grind-option"] === "cafetiére"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            "grind-option": "cafetiére",
                          })
                        }
                      />
                      Cafetiére
                    </RadioCard.Label>
                    <RadioCard.Description>
                      Course ground beans specially suited for french press
                      coffee
                    </RadioCard.Description>
                  </RadioCard.Root>
                </QuestionFieldset>
              </QuestionContent>
            </Question>
            <Question>
              <QuestionHeading id={deliveriesHeadingId}>
                How often should we deliver? <QuestionArrow />
              </QuestionHeading>
              <QuestionContent>
                <QuestionFieldset aria-labelledby={deliveriesHeadingId}>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="deliveries"
                        value="every-week"
                        checked={formData.deliveries === "every-week"}
                        onChange={() =>
                          setFormData({ ...formData, deliveries: "every-week" })
                        }
                      />
                      Every week
                    </RadioCard.Label>
                    <RadioCard.Description>
                      $14.00 per shipment. Includes free first-class shipping.
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="deliveries"
                        value="every-2-weeks"
                        checked={formData.deliveries === "every-2-weeks"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            deliveries: "every-2-weeks",
                          })
                        }
                      />
                      Every 2 weeks
                    </RadioCard.Label>
                    <RadioCard.Description>
                      $17.25 per shipment. Includes free priority shipping.
                    </RadioCard.Description>
                  </RadioCard.Root>
                  <RadioCard.Root>
                    <RadioCard.Label>
                      <RadioCard.Input
                        name="deliveries"
                        value="every-month"
                        checked={formData.deliveries === "every-month"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            deliveries: "every-month",
                          })
                        }
                      />
                      Every month
                    </RadioCard.Label>
                    <RadioCard.Description>
                      $22.50 per shipment. Includes free priority shipping.
                    </RadioCard.Description>
                  </RadioCard.Root>
                </QuestionFieldset>
              </QuestionContent>
            </Question>
          </section>
          <section aria-labelledby={checkoutHeadingId}>
            <h3 className="sr-only" id={checkoutHeadingId}>
              Checkout
            </h3>
            <div className="bg-darker-grey-blue text-[hsl(0_0%_100%)] mt-32 py-8 px-6 rounded tablet:mt-36 tablet:py-7 tablet:px-11 desktop:mt-[5.5rem] desktop:py-[2.9375rem] desktop:px-16">
              <h4 className="text-[hsl(0_0%_100%/50%)] text-[1rem] leading-[1.625rem] uppercase">
                Order summary
              </h4>
              <Summary className="mt-2" data={formData} />
            </div>
            <h4 className="sr-only">Submit order</h4>
            <Dialog.Root>
              <p className="mt-14 flex justify-center tablet:mt-10 desktop:justify-end">
                <Dialog.Trigger asChild aria-disabled="true">
                  <Button>Create my plan!</Button>
                </Dialog.Trigger>
              </p>
              <Dialog.Portal>
                <Dialog.Overlay>
                  <Dialog.Content aria-labelledby={undefined}>
                    {/* todo: Focus title on open */}
                    <Dialog.Title>Order summary</Dialog.Title>
                    <Summary data={formData} />
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
      </div>
    </div>
  );
}

function ProgressItem({ children }: { children: ReactNode }) {
  return (
    <li className="border-grey/25 border-t-[0.0625rem] py-6 first-of-type:border-t-0 first-of-type:pt-0">
      {children}
    </li>
  );
}

const progressLinkVariants = cva(
  "grid grid-cols-[3.625rem_1fr] transition-opacity",
  {
    variants: {
      variant: {
        active: "",
        inactive: "opacity-40 hocus:opacity-60",
        disabled: "opacity-20",
      },
    },
  }
);

const progressLinkContext = createContext<VariantProps<
  typeof progressLinkVariants
> | null>(null);

function useProgressLinkContext() {
  const value = useContext(progressLinkContext);
  if (value === null)
    throw new Error("Context must be used inside ProgressLink");

  return value;
}

function ProgressLink({
  className,
  variant,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof progressLinkVariants>) {
  return (
    <progressLinkContext.Provider value={{ variant }}>
      <a
        {...props}
        className={progressLinkVariants({
          className,
          variant,
        })}
      />
    </progressLinkContext.Provider>
  );
}

const progressNumberVariants = cva("", {
  variants: { isActive: { true: "text-dark-cyan", false: "text-grey" } },
});

function ProgressNumber({ children }: { children: ReactNode }) {
  const { variant } = useProgressLinkContext();

  return (
    <span
      className={progressNumberVariants({ isActive: variant === "active" })}
    >
      {children}
    </span>
  );
}

function Question({ children }: { children: ReactNode }) {
  return <Collapsible.Root>{children}</Collapsible.Root>;
}

function QuestionHeading({
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      {...props}
      className={cx("text-grey font-fraunces text-h2", props.className)}
    >
      <Collapsible.Trigger className="w-full grid grid-cols-[1fr_max-content] items-center gap-4 text-start">
        {children}
      </Collapsible.Trigger>
    </h4>
  );
}

function QuestionArrow() {
  return (
    <span className="text-dark-cyan">
      <Icon
        className="w-[1.1875rem] h-auto"
        name="icon-arrow"
        width="19"
        height="13"
      />
    </span>
  );
}

function QuestionContent({ children }: { children: ReactNode }) {
  return <Collapsible.Content>{children}</Collapsible.Content>;
}

function QuestionFieldset(props: FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset {...props} />;
}

function Summary({
  className,
  data,
}: {
  className?: string;
  data: CoffeeFormData;
}) {
  return (
    <blockquote
      className={cx(
        "font-fraunces font-black text-[1.5rem] leading-[2.5rem]",
        className
      )}
    >
      “I drink my coffee <Preference value={data.preferences} />, with a{" "}
      <BeanType value={data["bean-type"]} /> type of bean.{" "}
      <Quantity value={data.quantity} />
      {data.preferences === "capsule" ? null : (
        <>
          {" "}
          ground ala <GrindOption value={data["grind-option"]} />
        </>
      )}
      , sent to me <Deliveries value={data.deliveries} />
      .”
    </blockquote>
  );
}

function Preference({ value }: { value: CoffeeFormData["preferences"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "capsule":
      return (
        <>
          using <Keyword>capsules</Keyword>
        </>
      );
    case "filter":
      return (
        <>
          as <Keyword>filter</Keyword>
        </>
      );
    case "espresso":
      return (
        <>
          as <Keyword>espresso</Keyword>
        </>
      );
    default:
      throw new Error(`Preference "${value}" not implemented`);
  }
}

function BeanType({ value }: { value: CoffeeFormData["bean-type"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "single-origin":
      return <Keyword>single origin</Keyword>;
    case "decaf":
      return <Keyword>decaf</Keyword>;
    case "blended":
      return <Keyword>blended</Keyword>;
    default:
      throw new Error(`Bean type "${value}" not implemented`);
  }
}

function Quantity({ value }: { value: CoffeeFormData["quantity"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "250g":
      return <Keyword>250g</Keyword>;
    case "500g":
      return <Keyword>500g</Keyword>;
    case "1000g":
      return <Keyword>1000g</Keyword>;
    default:
      throw new Error(`Quantity "${value}" not implemented`);
  }
}

function GrindOption({ value }: { value: CoffeeFormData["grind-option"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "wholebean":
      return <Keyword>wholebean</Keyword>;
    case "filter":
      return <Keyword>filter</Keyword>;
    case "cafetiére":
      return <Keyword>cafetiére</Keyword>;
    default:
      throw new Error(`Grind option "${value}" not implemented`);
  }
}

function Deliveries({ value }: { value: CoffeeFormData["deliveries"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "every-week":
      return <Keyword>every week</Keyword>;
    case "every-2-weeks":
      return <Keyword>every 2 weeks</Keyword>;
    case "every-month":
      return <Keyword>every month</Keyword>;
    default:
      throw new Error(`Deliveries "${value}" not implemented`);
  }
}

function Blank() {
  return (
    <>
      <Keyword aria-hidden="true">_____</Keyword>
      <span className="sr-only">blank</span>
    </>
  );
}

function Keyword({ children }: { children: ReactNode }) {
  return <strong className="text-dark-cyan capitalize">{children}</strong>;
}
