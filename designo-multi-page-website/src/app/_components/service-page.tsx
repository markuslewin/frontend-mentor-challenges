import Image from "next/image";
import Link from "next/link";
import { useId, type ComponentPropsWithoutRef } from "react";
import type blogrUrl from "~/app/web-design/_assets/image-blogr.jpg";
import { GetInTouch as GetInTouchBase } from "~/app/_components/get-in-touch";
import { Leaf as LeafBase } from "~/app/_components/leaf";

export interface Project {
  image: typeof blogrUrl;
  name: string;
  body: string;
}

type HeroContainerProps = ComponentPropsWithoutRef<"div">;

export function HeroContainer(props: HeroContainerProps) {
  return <div className="center tablet:px-gutter px-0" {...props} />;
}

interface HeroProps extends ComponentPropsWithoutRef<"div"> {
  desktopPattern: "app" | "graphic" | "web";
}

export function Hero({ children, desktopPattern, ...props }: HeroProps) {
  return (
    <div
      className={[
        "bg-peach bg-bg-pattern-design-pages-intro-mobile bg-[length:54.75rem] bg-right-top bg-no-repeat py-28 text-center text-white tablet:rounded tablet:bg-bg-pattern-design-pages-intro-tablet tablet:bg-[calc(50%+4.5rem)_center] tablet:py-16",
        desktopPattern === "app"
          ? "desktop:bg-bg-pattern-intro-app desktop:bg-[calc(50%-10.9375rem)_center]"
          : desktopPattern === "graphic"
            ? "desktop:bg-bg-pattern-intro-graphic desktop:bg-[calc(50%-10.9375rem)_center]"
            : desktopPattern === "web"
              ? "desktop:bg-bg-pattern-intro-web desktop:bg-[calc(50%+7.3125rem)_center]"
              : "",
      ].join(" ")}
      {...props}
    >
      <div className="center max-w-96">{children}</div>
    </div>
  );
}

export function Leaf() {
  return (
    <div className="absolute -z-10 hidden w-full -translate-y-32 justify-center overflow-x-hidden desktop:grid">
      <LeafBase className="-translate-x-[13.5625rem]" />
    </div>
  );
}

type TitleProps = ComponentPropsWithoutRef<"h1">;

export function Title(props: TitleProps) {
  return <h1 className="text-h1" {...props} />;
}

type DescriptionProps = ComponentPropsWithoutRef<"h1">;

export function Description(props: DescriptionProps) {
  return <p className="mt-6" {...props} />;
}

type ProjectsAndServicesContainerProps = ComponentPropsWithoutRef<"div">;

export function ProjectsAndServicesContainer(
  props: ProjectsAndServicesContainerProps,
) {
  return <div className="center" {...props} />;
}

type ProjectsProps = ComponentPropsWithoutRef<"div">;

export function Projects({ children, ...props }: ProjectsProps) {
  return (
    <div
      className="mt-24 grid gap-10 tablet:mt-32 tablet:gap-8 desktop:mt-40 desktop:grid-cols-3"
      {...props}
    >
      <h2 className="sr-only">Projects</h2>
      {children}
    </div>
  );
}

interface ProjectProps extends Project {
  priority?: boolean;
}

export function Project({ image, name, body, priority }: ProjectProps) {
  const labelId = useId();
  const descId = useId();

  return (
    <Link
      className="group grid items-center overflow-hidden rounded bg-[hsl(14_76%_97%)] transition-colors hocus:bg-peach tablet:grid-cols-[339fr_350fr] desktop:grid-cols-none"
      href="#"
      aria-labelledby={labelId}
      aria-describedby={descId}
    >
      <div className="p-8 text-center">
        <h3
          className="text-h3 uppercase text-peach group-hocus:text-white"
          id={labelId}
        >
          {name}
        </h3>
        <p className="mt-4 group-hocus:text-white" id={descId}>
          {body}
        </p>
      </div>
      <Image className="-order-1" alt="" priority={priority} src={image} />
    </Link>
  );
}

type ServicesProps = ComponentPropsWithoutRef<"div">;

export function Services({ children, ...props }: ServicesProps) {
  return (
    <div
      className="mt-24 grid gap-6 tablet:mt-32 desktop:mt-40 desktop:grid-cols-2 desktop:gap-8"
      {...props}
    >
      <h2 className="sr-only">Other services</h2>
      {children}
    </div>
  );
}

export function GetInTouch() {
  return <GetInTouchBase className="mt-24 tablet:mt-32 desktop:mt-40" />;
}
