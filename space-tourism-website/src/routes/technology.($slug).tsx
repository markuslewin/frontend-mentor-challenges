import { invariantResponse } from "@epic-web/invariant";
import {
  LoaderFunctionArgs,
  NavLink,
  NavLinkProps,
  useLoaderData,
} from "react-router-dom";
import data from "../data/data.json";
import { assertValidSlug } from "../utils/assert-valid-slug";
import { useId } from "react";
import { toRootAbsolute } from "../utils/to-root-absolute";
import { screens } from "../utils/screens";

export const handle = {
  name: "technology",
};

interface LoaderData {
  technology: (typeof data)["technology"][number];
}

export function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  assertValidSlug(
    ["launch-vehicle", "spaceport", "space-capsule"] as const,
    slug
  );

  const name = (
    {
      "launch-vehicle": "Launch vehicle",
      spaceport: "Spaceport",
      "space-capsule": "Space capsule",
    } as const
  )[slug];
  const technology = data.technology.find((member) => member.name === name);
  invariantResponse(technology, "Not found", { status: 404 });

  const { images } = technology;

  return {
    technology: {
      ...technology,
      images: {
        landscape: toRootAbsolute(images.landscape),
        portrait: toRootAbsolute(images.portrait),
      },
    },
  } satisfies LoaderData;
}

export function TechnologyRoute() {
  const { technology } = useLoaderData() as LoaderData;
  const technologiesHeadingId = useId();

  return (
    <div className="mt-8 tablet:mt-16 desktop:mt-7 pb-20 tablet:pb-24 desktop:pb-28 desktop:overflow-hidden">
      <div className="technology-layout mx-auto max-w-[74.25rem] desktop:tablet:px-10">
        <picture className="technology-layout__image" key={technology.name}>
          <source
            media={`(min-width: ${screens.desktop})`}
            srcSet={technology.images.portrait}
            width={515}
            height={527}
          />
          <img
            className="mx-auto desktop:w-[32.1875rem] desktop:max-w-none"
            alt=""
            width={768}
            height={310}
            src={technology.images.landscape}
          />
        </picture>
        <nav
          className="technology-layout__nav mt-9 tablet:mt-14 desktop:mt-0 px-6 tablet:px-10 desktop:px-0"
          aria-labelledby={technologiesHeadingId}
        >
          <h2 className="sr-only" id={technologiesHeadingId}>
            Technologies
          </h2>
          <ul className="flex justify-center desktop:justify-normal gap-4 desktop:gap-8 desktop:flex-col">
            <li>
              <TechnologyNavLink to="/technology/launch-vehicle">
                <span className="translate-x-px desktop:translate-x-[2px]">
                  1
                </span>
                <span className="sr-only">, Launch vehicle</span>
              </TechnologyNavLink>
            </li>
            <li>
              <TechnologyNavLink to="/technology/spaceport">
                <span className="translate-x-px desktop:translate-x-[2px]">
                  2
                </span>
                <span className="sr-only">, Spaceport</span>
              </TechnologyNavLink>
            </li>
            <li>
              <TechnologyNavLink to="/technology/space-capsule">
                <span className="translate-x-px desktop:translate-x-[2px]">
                  3
                </span>
                <span className="sr-only">, Space capsule</span>
              </TechnologyNavLink>
            </li>
          </ul>
        </nav>
        <div className="technology-layout__text mt-7 tablet:mt-11 desktop:mt-0 mx-auto px-6 tablet:px-10 desktop:px-0 max-w-[28.625rem] desktop:max-w-none text-center desktop:text-start">
          <h2 className="font-barlow-condensed text-subheading-2 tablet:text-nav-text uppercase">
            The terminology…{" "}
            <span className="text-FFFFFF mt-2 tablet:mt-4 desktop:mt-3 block font-bellefair tracking-normal text-[1.5rem] leading-[1.75rem] tablet:text-[2.5rem] tablet:leading-[2.875rem] desktop:text-heading-3">
              {technology.name}
            </span>
          </h2>
          <p className="mt-4">{technology.description}</p>
        </div>
      </div>
    </div>
  );
}

function TechnologyNavLink(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `grid place-items-center rounded-full size-10 tablet:size-[3.75rem] desktop:size-20 border-[1px] font-bellefair text-[1rem] leading-[1.125rem] tracking-[0.0625rem] tablet:text-[1.5rem] tablet:leading-[1.75rem] tablet:tracking-[0.09375rem] desktop:text-heading-4 desktop:tracking-[0.125rem] clickable-12 transition-colors ${isActive ? "bg-FFFFFF text-0B0D17 border-[transparent]" : "text-FFFFFF border-FFFFFF/25 hocus:border-FFFFFF"}`
      }
      {...props}
    />
  );
}
