import * as Landmark from "#app/components/landmark";
import { Icon } from "#app/components/icon";
import { Image, Picture, Source } from "#app/components/picture";
// @ts-expect-error Search params
import desktopBgDaytime from "#app/assets/desktop/bg-image-daytime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import tabletBgDaytime from "#app/assets/tablet/bg-image-daytime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import mobileBgDaytime from "#app/assets/mobile/bg-image-daytime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import desktopBgNighttime from "#app/assets/desktop/bg-image-nighttime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import tabletBgNighttime from "#app/assets/tablet/bg-image-nighttime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import mobileBgNighttime from "#app/assets/mobile/bg-image-nighttime.jpg?format=webp&as=metadata";
import { screens } from "#app/utils/screens";
import { getGreeting, getIsNighttime } from "#app/utils/time.js";
import { cx } from "class-variance-authority";

export function Home() {
  const { unixtime } = {
    // abbreviation: "CEST",
    // datetime: "2024-06-17T18:29:35.780663+02:00",
    // day_of_week: 1,
    // day_of_year: 169,
    // timezone: "Europe/Stockholm",
    unixtime: 1718641775,
    // utc_datetime: "2024-06-17T16:29:35.780663+00:00",
    // utc_offset: "+02:00",
    // week_number: 25,
  };

  const time = new Date(unixtime * 1000);

  const isNighttime = getIsNighttime(time);
  const bg = isNighttime
    ? {
        desktop: desktopBgNighttime,
        tablet: tabletBgNighttime,
        mobile: mobileBgNighttime,
      }
    : {
        desktop: desktopBgDaytime,
        tablet: tabletBgDaytime,
        mobile: mobileBgDaytime,
      };

  const greeting = getGreeting(time);

  return (
    <div className="relative isolate min-h-screen">
      <div className="absolute inset-0 isolate -z-10">
        <Picture>
          <Source
            media={`(min-width: ${screens.desktop})`}
            image={bg.desktop}
          />
          <Source media={`(min-width: ${screens.tablet})`} image={bg.tablet} />
          <Image
            className="absolute inset-0 size-full object-cover"
            alt=""
            priority
            image={bg.mobile}
          />
        </Picture>
        <div className="bg-black/40 absolute inset-0" />
      </div>
      <h1 className="sr-only">Clock app</h1>
      <Landmark.Root>
        <Landmark.Label>
          <h2 className="sr-only">Quote</h2>
        </Landmark.Label>
        <blockquote>
          <p>
            “The science of operations, as derived from mathematics more
            especially, is a science of itself, and has its own abstract truth
            and value.”
          </p>
          <footer>
            <p className="text-h5">Ada Lovelace</p>
          </footer>
        </blockquote>
        <form>
          <button>
            <Icon
              className="h-[1.125rem] w-auto"
              name="icon-refresh"
              width="18"
              height="18"
            />
            <span className="sr-only">Get a new quote</span>
          </button>
        </form>
      </Landmark.Root>
      <Landmark.Root>
        <Landmark.Label>
          <h2 className="sr-only">Time</h2>
        </Landmark.Label>
        <p className="uppercase">
          <span className="text-h4">
            {isNighttime ? (
              <Icon
                className="h-6 w-auto"
                name="icon-moon"
                width="23"
                height="24"
              />
            ) : (
              <Icon className="size-6" name="icon-sun" />
            )}{" "}
            {greeting}, it’s currently
          </span>{" "}
          <span>
            <strong className="text-h1">11:37</strong>{" "}
            <span className="text-zone-abbr">BST</span>
          </span>{" "}
          <span className="text-h3">in London, UK</span>
        </p>
        <form>
          <button className="bg-white text-black/50 text-more-btn uppercase">
            More{" "}
            <Icon
              className="bg-gray text-white h-[0.4375rem] w-auto tablet:h-[0.5625rem]"
              name="icon-arrow-down"
              width="14"
              height="9"
            />
          </button>
        </form>
        <Landmark.Root
          className={cx(
            isNighttime ? "bg-black/75 text-white" : "bg-white/75 text-black",
          )}
        >
          <Landmark.Label>
            <h3 className="sr-only">Additional information</h3>
          </Landmark.Label>
          <div>
            <AdditionalInfo heading="Current timezone" value="Europe/London" />
            <AdditionalInfo heading="Day of the year" value="295" />
            <AdditionalInfo heading="Day of the week" value="5" />
            <AdditionalInfo heading="Week number" value="42" />
          </div>
        </Landmark.Root>
      </Landmark.Root>
    </div>
  );
}

interface AdditionalInfoProps {
  heading: string;
  value: string;
}

function AdditionalInfo({ heading, value }: AdditionalInfoProps) {
  return (
    <>
      <h4 className="text-h6 uppercase">{heading}</h4>
      <p className="text-h2">{value}</p>
    </>
  );
}
