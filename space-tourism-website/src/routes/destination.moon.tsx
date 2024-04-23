import { ReactNode, useId } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

export function DestinationMoonRoute() {
  const destinationsHeadingId = useId();

  return (
    <div className="mt-8 tablet:mt-[3.75rem] desktop:mt-16 pb-14 tablet:pb-16 desktop:pb-28 desktop:grid desktop:grid-cols-[minmax(0,31.8125rem)_minmax(0,27.8125rem)] desktop:justify-between desktop:gap-12">
      <picture className="place-self-end">
        <source
          type="image/webp"
          srcSet="/assets/destination/image-moon.webp"
        />
        <img
          className="mx-auto desktop:mx-0 max-w-[10.625rem] tablet:max-w-[18.75rem] desktop:max-w-full"
          alt=""
          src="/assets/destination/image-moon.png"
        />
      </picture>
      <article className="mt-7 tablet:mt-14 desktop:mt-0 mx-auto desktop:mx-0 max-w-[35.8125rem] desktop:max-w-[27.8125rem]">
        <header>
          <nav
            className="font-barlow-condensed text-nav-text uppercase"
            aria-labelledby={destinationsHeadingId}
          >
            <h2 className="sr-only" id={destinationsHeadingId}>
              Destinations
            </h2>
            <ul className="mx-auto desktop:mx-0 max-w-[14.875rem] tablet:max-w-[17.875rem] flex justify-between">
              <li>
                <DestinationNavLink to="/destination">Moon</DestinationNavLink>
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
        <div className="text-center desktop:text-start">
          <h2 className="text-FFFFFF mt-5 tablet:mt-8 desktop:mt-9 font-bellefair text-heading-3 tablet:text-[5rem] tablet:leading-[5.75rem] desktop:text-heading-2 uppercase">
            Moon
          </h2>
          <p className="tablet:mt-2 desktop:mt-4">
            See our planet as you’ve never seen it before. A perfect relaxing
            trip away to help regain perspective and come back refreshed. While
            you’re there, take in some history by visiting the Luna 2 and Apollo
            11 landing sites.
          </p>
        </div>
        <hr className="text-[hsl(231,15%,26%)] mt-8 tablet:mt-12 desktop:mt-14" />
        <div className="mt-8 tablet:mt-7 tablet:mx-auto desktop:mx-0 tablet:max-w-[22.5rem] desktop:max-w-none grid tablet:grid-cols-[auto_auto] tablet:justify-between desktop:grid-cols-2 gap-8 tablet:gap-0 text-center desktop:text-start">
          <Stat>
            <StatKey>Avg. distance</StatKey>
            <StatValue>384,400 km</StatValue>
          </Stat>
          <Stat>
            <StatKey>Est. travel time</StatKey>
            <StatValue>3 days</StatValue>
          </Stat>
        </div>
      </article>
    </div>
  );
}

interface DestinationNavLinkProps extends NavLinkProps {}

function DestinationNavLink(props: DestinationNavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `block ${isActive ? "text-FFFFFF border-b-[3px] pb-3" : ""}`
      }
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
