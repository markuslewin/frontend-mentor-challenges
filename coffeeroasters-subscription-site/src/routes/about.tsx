// @ts-expect-error Search params
import heroWhitecupMobile from "../assets/about/mobile/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import heroWhitecupTablet from "../assets/about/tablet/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import heroWhitecupDesktop from "../assets/about/desktop/image-hero-whitecup.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentMobile from "../assets/about/mobile/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentTablet from "../assets/about/tablet/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import commitmentDesktop from "../assets/about/desktop/image-commitment.jpg?as=metadata";
// @ts-expect-error Search params
import bgQualityMobile from "../assets/about/mobile/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import bgQualityTablet from "../assets/about/tablet/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import bgQualityDesktop from "../assets/about/desktop/bg-quality.png?as=metadata";
// @ts-expect-error Search params
import qualityMobile from "../assets/about/mobile/image-quality.jpg?as=metadata";
// @ts-expect-error Search params
import qualityTablet from "../assets/about/tablet/image-quality.jpg?as=metadata";
// @ts-expect-error Search params
import qualityDesktop from "../assets/about/desktop/image-quality.jpg?as=metadata";
import { AnnouncementHandle } from "../components/route-announcer";
import { screens } from "../utils/screens";
import { Icon } from "../components/icon";

export const handle = {
  announcement() {
    return "About";
  },
} satisfies AnnouncementHandle;

export function AboutRoute() {
  return (
    <>
      <h1>About us</h1>
      <p>
        Coffeeroasters began its journey of exotic discovery in 1999,
        highlighting stories of coffee from around the world. We have since been
        dedicated to bring the perfect cup - from bean to brew - in every
        shipment.
      </p>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={heroWhitecupDesktop.width}
          height={heroWhitecupDesktop.height}
          srcSet={heroWhitecupDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={heroWhitecupTablet.width}
          height={heroWhitecupTablet.height}
          srcSet={heroWhitecupTablet.src}
        />
        <img
          alt=""
          width={heroWhitecupMobile.width}
          height={heroWhitecupMobile.height}
          src={heroWhitecupMobile.src}
        />
      </picture>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={commitmentDesktop.width}
          height={commitmentDesktop.height}
          srcSet={commitmentDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={commitmentTablet.width}
          height={commitmentTablet.height}
          srcSet={commitmentTablet.src}
        />
        <img
          alt=""
          width={commitmentMobile.width}
          height={commitmentMobile.height}
          src={commitmentMobile.src}
        />
      </picture>
      <h2>Our commitment</h2>
      <p>
        We’re built on a simple mission and a commitment to doing good along the
        way. We want to make it easy for you to discover and brew the world’s
        best coffee at home. It all starts at the source. To locate the specific
        lots we want to purchase, we travel nearly 60 days a year trying to
        understand the challenges and opportunities in each of these places. We
        collaborate with exceptional coffee growers and empower a global
        community of farmers through with well above fair-trade benchmarks. We
        also offer training, support farm community initiatives, and invest in
        coffee plant science. Curating only the finest blends, we roast each lot
        to highlight tasting profiles distinctive to their native growing
        region.
      </p>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={bgQualityDesktop.width}
          height={bgQualityDesktop.height}
          srcSet={bgQualityDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={bgQualityTablet.width}
          height={bgQualityTablet.height}
          srcSet={bgQualityTablet.src}
        />
        <img
          alt=""
          width={bgQualityMobile.width}
          height={bgQualityMobile.height}
          src={bgQualityMobile.src}
        />
      </picture>
      <h2>Uncompromising quality</h2>
      <p>
        Although we work with growers who pay close attention to all stages of
        harvest and processing, we employ, on our end, a rigorous quality
        control program to avoid over-roasting or baking the coffee dry. Every
        bag of coffee is tagged with a roast date and batch number. Our goal is
        to roast consistent, user-friendly coffee, so that brewing is easy and
        enjoyable.
      </p>
      <picture>
        <source
          media={`(min-width: ${screens.desktop})`}
          width={qualityDesktop.width}
          height={qualityDesktop.height}
          srcSet={qualityDesktop.src}
        />
        <source
          media={`(min-width: ${screens.tablet})`}
          width={qualityTablet.width}
          height={qualityTablet.height}
          srcSet={qualityTablet.src}
        />
        <img
          alt=""
          width={qualityMobile.width}
          height={qualityMobile.height}
          src={qualityMobile.src}
        />
      </picture>
      <h2>Our headquarters</h2>
      <Icon name="illustration-uk" />
      <h3>United Kingdom</h3>
      <h4>Address</h4>
      <p>
        68 Asfordby Rd
        <br />
        Alcaston
        <br />
        SY6 1YA
      </p>
      <h4>Phone</h4>
      <p>
        <a href="tel:+441241918425">+44 1241 918425</a>
      </p>
      <Icon name="illustration-canada" />
      <h3>Canada</h3>
      <h4>Address</h4>
      <p>
        1528 Eglinton Avenue
        <br />
        Toronto
        <br />
        Ontario M4P 1A6
      </p>
      <h4>Phone</h4>
      <p>
        <a href="tel:+14164852997">+1 416 485 2997</a>
      </p>
      <Icon name="illustration-australia" />
      <h3>Australia</h3>
      <h4>Address</h4>
      <p>
        36 Swanston Street
        <br />
        Kewell
        <br />
        Victoria
      </p>
      <h4>Phone</h4>
      <p>
        <a href="tel:+61499283629">+61 4 9928 3629</a>
      </p>
    </>
  );
}
