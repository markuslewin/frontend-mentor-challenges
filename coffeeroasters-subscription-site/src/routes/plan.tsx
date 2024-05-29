// @ts-expect-error Search params
import heroBlackcupMobile from "../assets/plan/mobile/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupTablet from "../assets/plan/tablet/image-hero-blackcup.jpg?as=metadata";
// @ts-expect-error Search params
import heroBlackcupDesktop from "../assets/plan/desktop/image-hero-blackcup.jpg?as=metadata";
import {
  ButtonHTMLAttributes,
  FieldsetHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
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
import { useNavigate } from "react-router-dom";
import { currency, shipmentPrice, useQuestions } from "../utils/questions";
import { SafeParseReturnType, z } from "zod";
import { invariant } from "@epic-web/invariant";

export const handle = {
  announcement() {
    return "Create a plan";
  },
} satisfies AnnouncementHandle;

interface CoffeeFormData {
  preferences: "capsule" | "filter" | "espresso" | null;
  "bean-type": "single-origin" | "decaf" | "blended" | null;
  quantity: "250g" | "500g" | "1000g" | null;
  "grind-option": "wholebean" | "filter" | "cafetiére" | null;
  deliveries: "every-week" | "every-2-weeks" | "every-month" | null;
}

const commonProps = {
  "bean-type": z.enum(["single-origin", "decaf", "blended"]),
  quantity: z.enum(["250g", "500g", "1000g"]),
  deliveries: z.enum(["every-week", "every-2-weeks", "every-month"]),
};

const orderSchema = z.discriminatedUnion("preferences", [
  z.object({ preferences: z.literal("capsule") }).extend(commonProps),
  z
    .object({
      preferences: z.enum(["filter", "espresso"]),
      "grind-option": z.enum(["wholebean", "filter", "cafetiére"]),
    })
    .extend(commonProps),
]);

export function PlanRoute() {
  const navigate = useNavigate();

  const progressHeadingId = useId();
  const orderHeadingId = useId();
  const checkoutHeadingId = useId();

  const checkoutDialogHeadingRef = useRef<HTMLHeadingElement>(null);

  const [formData, setFormData] = useState<CoffeeFormData>({
    preferences: null,
    "bean-type": null,
    quantity: null,
    "grind-option": null,
    deliveries: null,
  });

  const questionsButtonRef = useRef<{
    preferences: HTMLButtonElement | null;
    "bean-type": HTMLButtonElement | null;
    quantity: HTMLButtonElement | null;
    "grind-option": HTMLButtonElement | null;
    deliveries: HTMLButtonElement | null;
  }>({
    preferences: null,
    "bean-type": null,
    quantity: null,
    "grind-option": null,
    deliveries: null,
  });

  const questions = useQuestions({ selectedQuantity: formData.quantity });

  const orderedQuestions = [
    { ...questions.data.preferences, id: "preferences", disabled: false },
    { ...questions.data["bean-type"], id: "bean-type", disabled: false },
    { ...questions.data.quantity, id: "quantity", disabled: false },
    {
      ...questions.data["grind-option"],
      id: "grind-option",
      disabled: formData.preferences === "capsule",
    },
    { ...questions.data.deliveries, id: "deliveries", disabled: false },
  ] as const;

  const enabledQuestions = orderedQuestions.filter(
    (question) => !question.disabled
  );

  const currentQuestion =
    enabledQuestions.find((question) => formData[question.id] === null) ??
    enabledQuestions[enabledQuestions.length - 1];

  const result = orderSchema.safeParse(formData);
  const isValid = result.success;

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
              className="bg-[hsl(160_12%_10%)]"
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
          className="col-start-1 col-span-5 hidden desktop:self-start desktop:sticky desktop:top-14 desktop:block"
          aria-labelledby={progressHeadingId}
        >
          <h3 className="sr-only" id={progressHeadingId}>
            Order progress
          </h3>
          <ol className="font-fraunces text-h4">
            {orderedQuestions.map((question, i) => (
              <ProgressItem key={question.id}>
                <ProgressLink
                  status={
                    question.disabled
                      ? "disabled"
                      : question.id === currentQuestion.id
                        ? "active"
                        : "inactive"
                  }
                  onClick={() => {
                    navigate(`#${question.headingId}`);
                    questions.setOpen(question.id, true);
                    questionsButtonRef.current[question.id]?.focus();
                  }}
                >
                  <ProgressNumber>
                    <span aria-hidden="true">0</span>
                    {i + 1}
                  </ProgressNumber>{" "}
                  {question.label}
                </ProgressLink>
              </ProgressItem>
            ))}
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
            {orderedQuestions.map((question) => (
              <Question
                key={question.id}
                disabled={question.disabled}
                open={question.disabled ? false : question.open}
                onOpenChange={(open) => {
                  if (
                    question.id === "grind-option" &&
                    formData.preferences === "capsule"
                  )
                    return;

                  questions.setOpen(question.id, open);
                }}
              >
                <QuestionHeading
                  ref={(node) => {
                    questionsButtonRef.current[question.id] = node;
                  }}
                  id={question.headingId}
                >
                  {question.heading} <QuestionArrow />
                </QuestionHeading>
                <QuestionContent>
                  <QuestionFieldset aria-labelledby={question.headingId}>
                    {question.options.map((option) => (
                      <RadioCard.Root key={option.id}>
                        <RadioCard.Input
                          name={question.id}
                          value={option.id}
                          checked={formData[question.id] === option.id}
                          onChange={() => {
                            if (
                              question.id === "preferences" &&
                              option.id === "capsule"
                            ) {
                              questions.setOpen("grind-option", false);
                            }
                            setFormData({
                              ...formData,
                              [question.id]: option.id,
                            });
                          }}
                        />
                        <RadioCard.Label>{option.label}</RadioCard.Label>
                        <RadioCard.Description>
                          {option.description}
                        </RadioCard.Description>
                      </RadioCard.Root>
                    ))}
                  </QuestionFieldset>
                </QuestionContent>
              </Question>
            ))}
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
                <Dialog.Trigger asChild aria-disabled={!isValid}>
                  <Button
                    status={isValid ? "enabled" : "disabled"}
                    onClick={(e) => {
                      if (!isValid) {
                        e.preventDefault();
                        return;
                      }
                    }}
                  >
                    Create my plan!
                  </Button>
                </Dialog.Trigger>
              </p>
              {isValid && (
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-black/50 fixed inset-0 overflow-y-auto p-6 grid grid-cols-[minmax(auto,33.75rem)] justify-center items-center">
                    <Dialog.Content
                      className="bg-light-cream rounded-sm"
                      aria-labelledby={undefined}
                      onOpenAutoFocus={(e) => {
                        checkoutDialogHeadingRef.current?.focus();
                        e.preventDefault();
                      }}
                    >
                      <div className="bg-dark-grey-blue text-white rounded-t-sm py-7 px-6 tablet:pt-12 tablet:pb-10 tablet:px-14">
                        <Dialog.Title
                          className="font-fraunces text-h2"
                          ref={checkoutDialogHeadingRef}
                          tabIndex={-1}
                        >
                          Order Summary
                        </Dialog.Title>
                      </div>
                      <div className="p-6 pt-10 tablet:p-14">
                        <Summary className="text-grey" data={formData} />
                        <p className="tablet:mt-2">
                          Is this correct? You can proceed to checkout or go
                          back to plan selection if something is off.
                          Subscription discount codes can also be redeemed at
                          the checkout.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3 tablet:mt-12">
                          <p className="font-fraunces text-h3 hidden tablet:block">
                            <span className="sr-only">Price: </span>
                            {currency.format(getMonthlyPrice(result))} / mo
                          </p>
                          <Button
                            className="grow"
                            type="button"
                            onClick={() => {
                              location.replace("/plan");
                            }}
                          >
                            Checkout
                            <span className="tablet:hidden">
                              <span aria-hidden="true"> - </span>
                              <span className="sr-only">Price: </span>
                              {currency.format(getMonthlyPrice(result))} / mo
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Overlay>
                </Dialog.Portal>
              )}
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
      status: {
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
  status,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof progressLinkVariants>) {
  const isDisabled = status === "disabled";

  return (
    <progressLinkContext.Provider value={{ status }}>
      <button
        type="button"
        aria-current={status === "active" ? "step" : undefined}
        aria-disabled={isDisabled}
        {...props}
        className={progressLinkVariants({
          className,
          status,
        })}
        onClick={isDisabled ? undefined : onClick}
      />
    </progressLinkContext.Provider>
  );
}

const progressNumberVariants = cva("", {
  variants: { isActive: { true: "text-dark-cyan", false: "text-grey" } },
});

function ProgressNumber({ children }: { children: ReactNode }) {
  const { status } = useProgressLinkContext();

  return (
    <span className={progressNumberVariants({ isActive: status === "active" })}>
      {children}
    </span>
  );
}

const questionContext = createContext<{
  disabled: boolean;
  open: boolean;
} | null>(null);

function useQuestionContext() {
  const value = useContext(questionContext);
  if (value === null) throw new Error("Must be used inside Question");

  return value;
}

const questionVariants = cva("transition-opacity", {
  variants: { status: { disabled: "opacity-50" } },
});

function Question({
  className,
  ...props
}: Collapsible.CollapsibleProps & { disabled: boolean; open: boolean }) {
  return (
    <questionContext.Provider
      value={{ disabled: props.disabled, open: props.open }}
    >
      <Collapsible.Root
        {...props}
        className={questionVariants({
          className,
          status: props.disabled ? "disabled" : undefined,
        })}
      />
    </questionContext.Provider>
  );
}

const QuestionHeading = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ children, ...props }, ref) => {
  const { disabled } = useQuestionContext();

  return (
    <h4
      {...props}
      className={cx("text-grey font-fraunces text-h2", props.className)}
    >
      <Collapsible.Trigger
        className="w-full grid grid-cols-[1fr_max-content] items-center gap-4 text-start"
        ref={ref}
        // Use `aria-disabled` for discoverability
        disabled={undefined}
        aria-disabled={disabled}
      >
        {children}
      </Collapsible.Trigger>
    </h4>
  );
});

function QuestionArrow() {
  const { open } = useQuestionContext();

  return (
    <span className="text-dark-cyan">
      <Icon
        className="w-[1.1875rem] h-auto transition-transform"
        style={{ transform: open ? "rotate(180deg)" : undefined }}
        name="icon-arrow"
        width="19"
        height="13"
      />
    </span>
  );
}

function QuestionContent({ children }: { children: ReactNode }) {
  return (
    <Collapsible.Content className="mt-8 tablet:mt-10 desktop:mt-14">
      {children}
    </Collapsible.Content>
  );
}

function QuestionFieldset({
  className,
  ...props
}: FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      className={cx(
        "grid gap-4 tablet:grid-cols-3 tablet:gap-3 desktop:gap-6",
        className
      )}
      {...props}
    />
  );
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
          using <Keyword>Capsules</Keyword>
        </>
      );
    case "filter":
      return (
        <>
          as <Keyword>Filter</Keyword>
        </>
      );
    case "espresso":
      return (
        <>
          as <Keyword>Espresso</Keyword>
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
      return <Keyword>Single Origin</Keyword>;
    case "decaf":
      return <Keyword>Decaf</Keyword>;
    case "blended":
      return <Keyword>Blended</Keyword>;
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
      return <Keyword>Wholebean</Keyword>;
    case "filter":
      return <Keyword>Filter</Keyword>;
    case "cafetiére":
      return <Keyword>Cafetiére</Keyword>;
    default:
      throw new Error(`Grind option "${value}" not implemented`);
  }
}

function Deliveries({ value }: { value: CoffeeFormData["deliveries"] }) {
  switch (value) {
    case null:
      return <Blank />;
    case "every-week":
      return <Keyword>Every Week</Keyword>;
    case "every-2-weeks":
      return <Keyword>Every 2 Weeks</Keyword>;
    case "every-month":
      return <Keyword>Every Month</Keyword>;
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
  return <strong className="text-dark-cyan">{children}</strong>;
}

function getMonthlyPrice(
  result: SafeParseReturnType<
    z.input<typeof orderSchema>,
    z.output<typeof orderSchema>
  >
) {
  invariant(result.success, "Price requires valid order");

  const perShipment =
    shipmentPrice[result.data.quantity][result.data.deliveries];
  const shipments = {
    "every-week": 4,
    "every-2-weeks": 2,
    "every-month": 1,
  }[result.data.deliveries];

  return perShipment * shipments;
}
