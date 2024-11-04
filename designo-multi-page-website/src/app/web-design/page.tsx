import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { GetInTouch } from "~/app/_components/get-in-touch";
import {
  AppDesignService,
  GraphicDesignService,
} from "~/app/_components/service";
import blogrUrl from "~/app/web-design/_assets/image-blogr.jpg";
import builderUrl from "~/app/web-design/_assets/image-builder.jpg";
import campUrl from "~/app/web-design/_assets/image-camp.jpg";
import expressUrl from "~/app/web-design/_assets/image-express.jpg";
import photonUrl from "~/app/web-design/_assets/image-photon.jpg";
import transferUrl from "~/app/web-design/_assets/image-transfer.jpg";

interface Project {
  image: typeof blogrUrl;
  name: string;
  body: string;
}

const projects: Project[] = [
  {
    image: expressUrl,
    name: "Express",
    body: "A multi-carrier shipping website for ecommerce businesses",
  },
  {
    image: transferUrl,
    name: "Transfer",
    body: "Site for low-cost money transfers and sending money within seconds",
  },
  {
    image: photonUrl,
    name: "Photon",
    body: "A state-of-the-art music player with high-resolution audio and DSP effects",
  },
  {
    image: builderUrl,
    name: "Builder",
    body: "Connects users with local contractors based on their location",
  },
  {
    image: blogrUrl,
    name: "Blogr",
    body: "Blogr is a platform for creating an online blog or publication",
  },
  {
    image: campUrl,
    name: "Camp",
    body: "Get expert training in coding, data, design, and digital marketing",
  },
];

export default function WebDesignPage() {
  return (
    <>
      <div className="center tablet:px-gutter px-0">
        <div className="bg-peach py-28 text-center text-white tablet:rounded tablet:py-16">
          <div className="center max-w-96">
            <h1 className="text-h1">Web design</h1>
            <p className="mt-6">
              We build websites that serve as powerful marketing tools and bring
              memorable brand experiences.
            </p>
          </div>
        </div>
      </div>
      <div className="center">
        <div className="mt-24 grid gap-10 tablet:mt-32 tablet:gap-8 desktop:mt-40 desktop:grid-cols-3">
          <h2 className="sr-only">Projects</h2>
          {projects.map((project) => {
            return <Project key={project.name} {...project} />;
          })}
        </div>
        <div className="mt-24 grid gap-6 tablet:mt-32 desktop:mt-40 desktop:grid-cols-2 desktop:gap-8">
          <h2 className="sr-only">Other services</h2>
          <AppDesignService />
          <GraphicDesignService />
        </div>
      </div>
      <GetInTouch className="mt-24 tablet:mt-32 desktop:mt-40" />
    </>
  );
}

type ProjectProps = Project;

function Project({ image, name, body }: ProjectProps) {
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
