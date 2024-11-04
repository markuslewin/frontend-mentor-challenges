import Image from "next/image";
import Link from "next/link";
import { useId, type ComponentPropsWithoutRef } from "react";
import type blogrUrl from "~/app/web-design/_assets/image-blogr.jpg";
import { GetInTouch as GetInTouchBase } from "~/app/_components/get-in-touch";

export interface Project {
  image: typeof blogrUrl;
  name: string;
  body: string;
}

type HeroContainerProps = ComponentPropsWithoutRef<"div">;

export function HeroContainer(props: HeroContainerProps) {
  return <div className="center tablet:px-gutter px-0" {...props} />;
}

type HeroProps = ComponentPropsWithoutRef<"div">;

export function Hero({ children, ...props }: HeroProps) {
  return (
    <div
      className="bg-peach py-28 text-center text-white tablet:rounded tablet:py-16"
      {...props}
    >
      <div className="center max-w-96">{children}</div>
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

type ProjectProps = Project;

export function Project({ image, name, body }: ProjectProps) {
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
      <Image className="-order-1" alt="" src={image} />
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
