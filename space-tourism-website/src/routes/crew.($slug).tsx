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

interface LoaderData {
  member: (typeof data)["crew"][number] & {
    images: { meta: { width: number; height: number } };
  };
}

export const handle = {
  name: "crew",
  announcement(data: LoaderData) {
    return data.member.name;
  },
};

export function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  assertValidSlug(
    [
      "douglas-hurley",
      "mark-shuttleworth",
      "victor-glover",
      "anousheh-ansari",
    ] as const,
    slug
  );

  const meta = (
    {
      "douglas-hurley": { name: "Douglas Hurley", width: 514, height: 700 },
      "mark-shuttleworth": {
        name: "Mark Shuttleworth",
        width: 433,
        height: 640,
      },
      "victor-glover": { name: "Victor Glover", width: 549, height: 645 },
      "anousheh-ansari": { name: "Anousheh Ansari", width: 575, height: 602 },
    } as const
  )[slug];

  const member = data.crew.find((member) => member.name === meta.name);
  invariantResponse(member, "Not found", { status: 404 });

  const { images } = member;

  return {
    member: {
      ...member,
      images: {
        png: toRootAbsolute(images.png),
        webp: toRootAbsolute(images.webp),
        meta,
      },
    },
  } satisfies LoaderData;
}

export function CrewRoute() {
  const { member } = useLoaderData() as LoaderData;
  const crewHeadingId = useId();

  return (
    <article className="crew-layout mt-8 tablet:mt-[3.75rem] desktop:mt-0 mx-auto desktop:w-full max-w-[74.25rem] px-6 tablet:px-10 pb-28 tablet:pb-0 grid">
      <header className="crew-layout__nav">
        <nav aria-labelledby={crewHeadingId}>
          <h2 className="sr-only" id={crewHeadingId}>
            Crew
          </h2>
          <ul className="flex justify-center desktop:justify-start gap-4 desktop:gap-6">
            <li>
              <CrewNavLink to="/crew/douglas-hurley">
                <span className="sr-only">Douglas Hurley</span>
              </CrewNavLink>
            </li>
            <li>
              <CrewNavLink to="/crew/mark-shuttleworth">
                <span className="sr-only">Mark Shuttleworth</span>
              </CrewNavLink>
            </li>
            <li>
              <CrewNavLink to="/crew/victor-glover">
                <span className="sr-only">Victor Glover</span>
              </CrewNavLink>
            </li>
            <li>
              <CrewNavLink to="/crew/anousheh-ansari">
                <span className="sr-only">Anousheh Ansari</span>
              </CrewNavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="crew-layout__text mx-auto w-full max-w-[28.625rem] desktop:max-w-none text-center desktop:text-start">
        <h2 className="text-FFFFFF/50 font-bellefair text-[1rem] leading-[1.125rem] tablet:text-[1.5rem] tablet:leading-[1.75rem] desktop:text-heading-4 uppercase">
          {member.role}{" "}
          <span className="text-FFFFFF text-[1.5rem] leading-[1.75rem] tablet:text-[2.5rem] tablet:leading-[2.875rem] desktop:text-heading-3 mt-2 desktop:mt-4 block">
            {member.name}
          </span>
        </h2>
        <p className="mt-4 desktop:mt-7 desktop:max-w-[27.75rem]">
          {member.bio}
        </p>
      </div>
      <picture
        className="crew-layout__image tablet:mt-10 desktop:mt-0 border-b-[1px] border-[hsl(231,15%,26%)] tablet:border-b-0"
        key={member.name}
      >
        <source type="image/webp" srcSet={member.images.webp} />
        <img
          className="mx-auto w-auto max-w-none desktop:max-w-[34rem] h-56 tablet:h-[33.25rem] desktop:h-auto"
          alt=""
          width={member.images.meta.width}
          height={member.images.meta.height}
          src={member.images.png}
        />
      </picture>
    </article>
  );
}

function CrewNavLink(props: NavLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `dot clickable-[1.625rem] desktop:clickable-[2.4375rem] transition-colors ${isActive ? "text-FFFFFF" : "text-FFFFFF/[17.44%] hocus:text-FFFFFF/50"}`
      }
      replace
      {...props}
    />
  );
}
