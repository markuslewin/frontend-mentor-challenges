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
import { ReactNode, useState } from "react";

export function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="relative isolate grid min-h-screen grid-rows-[1fr_auto] pt-8 tablet:pt-20 desktop:pt-14">
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
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <Center className="grid">
        <div className="grid grid-rows-[1fr_auto]">
          <h1 className="sr-only">Clock app</h1>
          <Landmark.Root>
            <Landmark.Label>
              <h2 className="sr-only">Quote</h2>
            </Landmark.Label>
            <blockquote>
              <p>
                “The science of operations, as derived from mathematics more
                especially, is a science of itself, and has its own abstract
                truth and value.”
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
            <div className="flex flex-col justify-between gap-12 tablet:gap-20 desktop:flex-row desktop:items-end">
              <p className="uppercase">
                <span className="flex flex-wrap items-center gap-4 text-h4">
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
                <span className="mt-4 flex flex-wrap items-baseline gap-1 tablet:gap-3">
                  <strong className="text-h1">11:37</strong>{" "}
                  <span className="text-zone-abbr">BST</span>
                </span>{" "}
                <span className="mt-4 block text-h3">in London, UK</span>
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
              >
                <button className="group inline-flex items-center gap-4 rounded-full bg-white p-1 pl-4 text-more-btn uppercase text-black/50 tablet:gap-3 tablet:p-2 tablet:pl-5">
                  More{" "}
                  <span className="group-hocus:bg-[hsl(0_0%_60%)] grid size-8 place-items-center rounded-full bg-gray text-white transition-colors tablet:size-10">
                    <Icon
                      className={cx(
                        "h-[0.4375rem] w-auto transition-transform tablet:h-[0.5625rem]",
                        isExpanded ? "rotate-180" : "",
                      )}
                      name="icon-arrow-down"
                      width="14"
                      height="9"
                    />
                  </span>
                </button>
              </form>
            </div>
          </Landmark.Root>
        </div>
      </Center>
      <div
        className={cx(
          "grid items-start overflow-hidden transition-[grid-template-rows]",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Landmark.Root
            className={cx(
              "py-12 tablet:py-32 desktop:py-[4.625rem]",
              isNighttime ? "bg-black/75 text-white" : "bg-white/75 text-black",
            )}
          >
            <Center>
              <Landmark.Label>
                {/* `fixed`, because we don't want it to trigger overflow when the region is hidden. */}
                <h3 className="sr-only fixed">Additional information</h3>
              </Landmark.Label>
              <div className="grid gap-y-4 tablet:grid-cols-2 tablet:gap-y-12 desktop:gap-y-11">
                <AdditionalInfo
                  className="tablet:col-start-1 tablet:row-start-1"
                  heading="Current timezone"
                  value="Europe/London"
                />
                <AdditionalInfo
                  className="tablet:col-start-1"
                  heading="Day of the year"
                  value="295"
                />
                <AdditionalInfo
                  className="tablet:row-start-1"
                  heading="Day of the week"
                  value="5"
                />
                <AdditionalInfo heading="Week number" value="42" />
              </div>
            </Center>
          </Landmark.Root>
        </div>
      </div>
    </div>
  );
}

interface CenterProps {
  children: ReactNode;
  className?: string;
}

function Center({ className, children }: CenterProps) {
  return (
    <div
      className={cx(
        "mx-auto box-content max-w-[69.375rem] px-7 tablet:px-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface AdditionalInfoProps {
  heading: string;
  value: string;
  className?: string;
}

function AdditionalInfo({ className, heading, value }: AdditionalInfoProps) {
  return (
    <div
      className={cx(
        "grid grid-cols-[max-content_auto] items-center justify-between gap-4 tablet:grid-cols-none tablet:gap-2",
        className,
      )}
    >
      <h4 className="text-h6 uppercase">{heading}</h4>
      <p className="text-h2">{value}</p>
    </div>
  );
}
