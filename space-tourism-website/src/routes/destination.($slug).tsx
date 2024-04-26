import { invariantResponse } from "@epic-web/invariant";
import { ReactNode, useId } from "react";
import {
  LoaderFunctionArgs,
  NavLink,
  NavLinkProps,
  useLoaderData,
} from "react-router-dom";
import data from "../data/data.json";
import { assertValidSlug } from "../utils/assert-valid-slug";
import { toRootAbsolute } from "../utils/to-root-absolute";

interface LoaderData {
  destination: (typeof data)["destinations"][number];
}

export const handle = {
  name: "destination",
  announcement(data: LoaderData) {
    return data.destination.name;
  },
};

export function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  assertValidSlug(["moon", "mars", "europa", "titan"] as const, slug);

  const name = (
    { moon: "Moon", mars: "Mars", europa: "Europa", titan: "Titan" } as const
  )[slug];
  const destination = data.destinations.find(
    (destination) => destination.name === name
  );
  invariantResponse(destination, "Not found", { status: 404 });

  const { images } = destination;

  return {
    destination: {
      ...destination,
      images: {
        webp: toRootAbsolute(images.webp),
        png: toRootAbsolute(images.png),
      },
    },
  } satisfies LoaderData;
}

export function DestinationRoute() {
  const { destination } = useLoaderData() as LoaderData;
  const destinationsHeadingId = useId();

  return (
    <article className="destination-layout mt-8 tablet:mt-[3.75rem] desktop:mt-16 mx-auto max-w-[74.25rem] px-6 tablet:px-10 pb-14 tablet:pb-16 desktop:pb-28">
      <header className="destination-layout__nav mt-7 tablet:mt-14 desktop:mt-0 desktop:mx-0">
        <nav
          className="font-barlow-condensed text-nav-text uppercase"
          aria-labelledby={destinationsHeadingId}
        >
          <h2 className="sr-only" id={destinationsHeadingId}>
            Destinations
          </h2>
          <ul className="mx-auto desktop:mx-0 max-w-[14.875rem] tablet:max-w-[17.875rem] flex justify-between">
            <li>
              <DestinationNavLink to="/destination/moon">
                Moon
              </DestinationNavLink>
            </li>
            <li>
              <DestinationNavLink to="/destination/mars">
                Mars
              </DestinationNavLink>
            </li>
            <li>
              <DestinationNavLink to="/destination/europa">
                Europa
              </DestinationNavLink>
            </li>
            <li>
              <DestinationNavLink to="/destination/titan">
                Titan
              </DestinationNavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="destination-layout__text mx-auto max-w-[35.8125rem] desktop:max-w-[27.8125rem]">
        <div className="text-center desktop:text-start">
          <h2 className="text-FFFFFF mt-5 tablet:mt-8 desktop:mt-9 font-bellefair text-heading-3 tablet:text-[5rem] tablet:leading-[5.75rem] desktop:text-heading-2 uppercase">
            {destination.name}
          </h2>
          <p className="tablet:mt-2 desktop:mt-4">{destination.description}</p>
        </div>
        <hr className="text-[hsl(231,15%,26%)] mt-8 tablet:mt-12 desktop:mt-14" />
        <div className="mt-8 tablet:mt-7 tablet:mx-auto desktop:mx-0 tablet:max-w-[22.5rem] desktop:max-w-none grid tablet:grid-cols-[auto_auto] tablet:justify-between desktop:grid-cols-2 gap-8 tablet:gap-0 text-center desktop:text-start">
          <Stat>
            <StatKey>Avg. distance</StatKey>
            <StatValue>{destination.distance}</StatValue>
          </Stat>
          <Stat>
            <StatKey>Est. travel time</StatKey>
            <StatValue>{destination.travel}</StatValue>
          </Stat>
        </div>
      </div>
      <picture className="destination-layout__image" key={destination.name}>
        <source type="image/webp" srcSet={destination.images.webp} />
        <img
          className="mx-auto desktop:mx-0 w-[10.625rem] tablet:w-[18.75rem] desktop:w-full"
          alt=""
          width={445}
          height={445}
          src={destination.images.png}
        />
      </picture>
    </article>
  );
}

interface DestinationNavLinkProps extends NavLinkProps {}

function DestinationNavLink(props: DestinationNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `block pb-3 ${isActive ? "text-FFFFFF border-b-[3px]" : "hocus:border-FFFFFF/50 hocus:border-b-[3px]"}`
      }
      replace
      {...props}
    />
  );
}

function Stat({ children }: { children: ReactNode }) {
  return (
    <p className="font-barlow-condensed text-subheading-2 uppercase">
      {children}
    </p>
  );
}

function StatKey({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <span className="sr-only">: </span>
    </>
  );
}

function StatValue({ children }: { children: ReactNode }) {
  return (
    <strong className="text-FFFFFF mt-3 block font-bellefair text-subheading-1 tracking-normal">
      {children}
    </strong>
  );
}
