import desktopAboutHeroUrl from "~/app/about/_assets/desktop/image-about-hero.jpg";
import tabletAboutHeroUrl from "~/app/about/_assets/tablet/image-about-hero.jpg";
import mobileAboutHeroUrl from "~/app/about/_assets/mobile/image-about-hero.jpg";
import desktopWorldClassTalentUrl from "~/app/about/_assets/desktop/image-world-class-talent.jpg";
import tabletWorldClassTalentUrl from "~/app/about/_assets/tablet/image-world-class-talent.jpg";
import mobileWorldClassTalentUrl from "~/app/about/_assets/mobile/image-world-class-talent.jpg";
import desktopRealDealUrl from "~/app/about/_assets/desktop/image-real-deal.jpg";
import tabletRealDealUrl from "~/app/about/_assets/tablet/image-real-deal.jpg";
import mobileRealDealUrl from "~/app/about/_assets/mobile/image-real-deal.jpg";
import { getMediaImageProps } from "~/app/_utils/image";
import { GetInTouch } from "~/app/_components/get-in-touch";
import { Locations } from "~/app/_components/locations";
import { OverlaidFooter } from "~/app/_components/footer";
import { type Metadata } from "next";
import { Leaf } from "~/app/_components/leaf";

const aboutHeroImage = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileAboutHeroUrl,
    tablet: tabletAboutHeroUrl,
    desktop: desktopAboutHeroUrl,
  },
});

const worldClassTalentImage = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileWorldClassTalentUrl,
    tablet: tabletWorldClassTalentUrl,
    desktop: desktopWorldClassTalentUrl,
  },
});

const realDealImage = getMediaImageProps({
  alt: "",
  breakpoint: {
    mobile: mobileRealDealUrl,
    tablet: tabletRealDealUrl,
    desktop: desktopRealDealUrl,
  },
});

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <main>
        <div className="center tablet:px-gutter px-0">
          <div className="region bg-peach text-white">
            <picture className="desktop:col-span-2 desktop:col-start-4 desktop:row-start-1">
              <source {...aboutHeroImage.desktopSourceProps} />
              <source {...aboutHeroImage.tabletSourceProps} />
              <img {...aboutHeroImage.mobileImageProps} className="w-full" />
            </picture>
            <div className="region__text desktop:col-start-2 desktop:row-start-1">
              <h1 className="text-h1">About Us</h1>
              <p className="mt-6 tablet:mt-8">
                Founded in 2010, we are a creative agency that produces lasting
                results for our clients. We’ve partnered with many startups,
                corporations, and nonprofits alike to craft designs that make
                real impact. We’re always looking forward to creating brands,
                products, and digital experiences that connect with our
                clients&apos; audiences.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -z-10 hidden w-full -translate-y-40 justify-center overflow-x-hidden desktop:grid">
          <Leaf className="-translate-x-[13.5625rem]" />
        </div>
        <div className="center tablet:px-gutter px-0">
          <div className="region bg-[hsl(14_76%_97%)] tablet:mt-32 desktop:mt-40">
            <picture className="col-span-2 row-start-1">
              <source {...worldClassTalentImage.desktopSourceProps} />
              <source {...worldClassTalentImage.tabletSourceProps} />
              <img
                {...worldClassTalentImage.mobileImageProps}
                className="w-full"
              />
            </picture>
            <div className="region__text col-start-4 row-start-1">
              <h2 className="text-h2 text-peach">World-class talent</h2>
              <p className="mt-6">
                We are a crew of strategists, problem-solvers, and
                technologists. Every design is thoughtfully crafted from concept
                to launch, ensuring success in its given market. We are
                constantly updating our skills in a myriad of platforms.
              </p>
              <p className="mt-[1.625em]">
                Our team is multi-disciplinary and we are not merely interested
                in form — content and meaning are just as important. We give
                great importance to craftsmanship, service, and prompt delivery.
                Clients have always been impressed with our high-quality
                outcomes that encapsulates their brand’s story and mission.
              </p>
            </div>
          </div>
          <Locations />
        </div>
        <div className="absolute -z-10 hidden w-full -translate-y-44 justify-center overflow-x-hidden desktop:grid">
          <Leaf className="translate-x-[38.3125rem]" />
        </div>
        <div className="center tablet:px-gutter px-0">
          <div className="region mt-32 bg-[hsl(14_76%_97%)] desktop:mt-40">
            <picture className="desktop:col-span-2 desktop:col-start-4 desktop:row-start-1">
              <source {...realDealImage.desktopSourceProps} />
              <source {...realDealImage.tabletSourceProps} />
              <img {...realDealImage.mobileImageProps} className="w-full" />
            </picture>
            <div className="region__text desktop:col-start-2 desktop:row-start-1">
              <h2 className="text-h2 text-peach">The real deal</h2>
              <p className="mt-6">
                As strategic partners in our clients’ businesses, we are ready
                to take on any challenge as our own. Solving real problems
                require empathy and collaboration, and we strive to bring a
                fresh perspective to every opportunity. We make design and
                technology more accessible and give you tools to measure
                success.
              </p>
              <p className="mt-[1.625em]">
                We are visual storytellers in appealing and captivating ways. By
                combining business and marketing strategies, we inspire
                audiences to take action and drive real results.
              </p>
            </div>
          </div>
        </div>
        <GetInTouch className="mt-32 desktop:mt-40" />
      </main>
      <OverlaidFooter />
    </>
  );
}
