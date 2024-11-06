import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";
import heroPhoneUrl from "~/app/_assets/desktop/image-hero-phone.png";
import illustrationPassionate from "~/app/_assets/illustration-passionate.svg";
import illustrationResourceful from "~/app/_assets/illustration-resourceful.svg";
import illustrationFriendly from "~/app/_assets/illustration-friendly.svg";
import { GetInTouch } from "~/app/_components/get-in-touch";
import {
  AppDesignService,
  GraphicDesignService,
  WebDesignService,
} from "~/app/_components/service";
import { OverlaidFooter } from "~/app/_components/footer";

const hashLocations = {
  services: "services",
};

export default function HomePage() {
  return (
    <>
      <main>
        <div className="center tablet:px-gutter px-0">
          <div className="isolate overflow-hidden bg-peach pt-20 text-white tablet:rounded-[0.9375rem] tablet:pt-16 desktop:pt-32">
            <div className="center-inner desktop:grid desktop:grid-cols-[minmax(auto,33.75rem)_minmax(auto,17.5rem)] desktop:justify-between">
              <div className="text-center desktop:text-start">
                <h1 className="text-h1">
                  Award-winning custom designs and digital branding solutions
                </h1>
                <p className="mx-auto mt-5 max-w-[27.8125rem] desktop:mx-0">
                  With over 10 years in the industry, we are experienced in
                  creating fully responsive websites, app design, and engaging
                  brand experiences. Find out more about our services.
                </p>
                <p className="mt-6 flex justify-center tablet:mt-5 desktop:mt-10 desktop:justify-start">
                  <Link className="button" href={`#${hashLocations.services}`}>
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="relative mx-auto mt-20 aspect-[283/371] max-w-72 tablet:aspect-[283/388] desktop:m-0 desktop:aspect-[283/501]">
                <Image
                  className="absolute -z-10 w-[224%] max-w-none -translate-x-[28%] -translate-y-[18%]"
                  alt=""
                  src={heroPhoneUrl}
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="sr-only" id={hashLocations.services}>
          Services
        </h2>
        <div className="center mt-32 grid gap-6 desktop:mt-40 desktop:grid-cols-2">
          <WebDesignService className="desktop:row-span-2" />
          <AppDesignService />
          <GraphicDesignService />
        </div>
        <h2 className="sr-only">Values</h2>
        <div className="center mt-32 grid gap-20 tablet:gap-8 desktop:mt-40 desktop:grid-cols-3">
          <Adjective
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            image={illustrationPassionate}
            heading="Passionate"
            body="Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions."
          />
          <Adjective
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            image={illustrationResourceful}
            heading="Resourceful"
            body="Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs."
          />
          <Adjective
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            image={illustrationFriendly}
            heading="Friendly"
            body="We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide."
          />
        </div>
        <GetInTouch className="mt-32 tablet:mt-16 desktop:mt-40" />
      </main>
      <OverlaidFooter />
    </>
  );
}

interface AdjectiveProps {
  image: ComponentProps<typeof Image>["src"];
  heading: string;
  body: string;
}

function Adjective({ body, heading, image }: AdjectiveProps) {
  return (
    <div className="grid justify-items-center gap-12 text-center tablet:grid-cols-[auto_1fr] tablet:items-center tablet:text-start desktop:grid-cols-none desktop:items-start desktop:text-center">
      <Image alt="" src={image} />
      <div>
        <h3 className="text-h3 uppercase">{heading}</h3>
        <p className="mt-8 tablet:mt-4 desktop:mt-8">{body}</p>
      </div>
    </div>
  );
}
