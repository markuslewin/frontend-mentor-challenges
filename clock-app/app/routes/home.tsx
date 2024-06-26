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
import { formatTime, getGreeting, getIsNighttime } from "#app/utils/time";
import { cx } from "class-variance-authority";
import { ReactNode, useRef, useState } from "react";
import { Quote } from "#app/components/quote";
import { Location } from "#app/components/location";
import { useQuery } from "@tanstack/react-query";
import { invariant } from "@epic-web/invariant";
import { z } from "zod";
import { nbsp } from "#app/utils/unicode";

const timeResponseSchema = z.object({
  abbreviation: z.string(),
  timezone: z.string(),
  day_of_week: z.number(),
  day_of_year: z.number(),
  unixtime: z.number(),
  week_number: z.number(),
});

function useDate() {
  return useQuery({
    queryKey: ["date"],
    async queryFn() {
      const response = await fetch("http://worldtimeapi.org/api/ip");
      invariant(response.ok, `Unsuccessful status code: ${response.status}`);

      const json = await response.json();
      const time = timeResponseSchema.parse(json);

      return time;
    },
    staleTime: Infinity,
  });
}

export function Home() {
  const expandedTriggerRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const date = useDate();

  const time = date.isSuccess
    ? new Date(date.data.unixtime * 1000)
    : new Date();

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
    <div
      className="relative isolate grid min-h-screen grid-rows-[1fr_auto]"
      onFocus={() => {
        if (document.activeElement !== expandedTriggerRef.current) {
          setIsExpanded(false);
        }
      }}
    >
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
      <Center>
        <div className="grid grid-rows-[auto_1fr] gap-14 tablet:gap-24">
          <h1 className="sr-only">Clock app</h1>
          <Landmark.Root
            className={cx(
              "grid items-end transition-[grid-template-rows]",
              isExpanded ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
            )}
          >
            <Landmark.Label>
              <h2 className="sr-only">Quote</h2>
            </Landmark.Label>
            <Quote />
          </Landmark.Root>
          <Landmark.Root className="self-end">
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
                  <span>
                    {greeting}
                    <span className="hidden tablet:inline">
                      , it’s currently
                    </span>
                  </span>
                </span>{" "}
                <span className="mt-4 flex flex-wrap items-baseline gap-1 tablet:gap-3">
                  <strong className="text-h1">{formatTime(time)}</strong>{" "}
                  <span className="text-zone-abbr">
                    {date.isSuccess ? date.data.abbreviation : nbsp}
                  </span>
                </span>{" "}
                <Location />
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
              >
                <button
                  className="group inline-flex items-center gap-4 rounded-full bg-white p-1 pl-4 text-more-btn uppercase text-black/50 tablet:gap-3 tablet:p-2 tablet:pl-5"
                  ref={expandedTriggerRef}
                  aria-expanded={isExpanded}
                >
                  More{" "}
                  <span className="grid size-8 place-items-center rounded-full bg-gray text-white transition-colors group-hocus:bg-[hsl(0_0%_60%)] tablet:size-10">
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
          isExpanded
            ? "grid-rows-[2.5rem_1fr] tablet:grid-rows-[4rem_1fr] desktop:grid-rows-[3.5rem_1fr]"
            : "grid-rows-[2.5rem_0fr] tablet:grid-rows-[4rem_0fr] desktop:grid-rows-[6.125rem_0fr]",
        )}
        aria-hidden={!isExpanded}
      >
        <div className="row-start-2 overflow-hidden">
          <Landmark.Root
            className={cx(
              "py-12 backdrop-blur-lg tablet:py-32 desktop:py-[4.625rem]",
              isNighttime ? "bg-black/75 text-white" : "bg-white/75 text-gray",
            )}
          >
            <Center>
              <Landmark.Label>
                {/* `fixed`, because we don't want it to trigger overflow when the region is hidden. */}
                <h3 className="sr-only fixed">Additional information</h3>
              </Landmark.Label>
              <div className="grid gap-y-4 tablet:grid-cols-[570fr_minmax(1rem,188fr)_539fr] tablet:grid-rows-2 tablet:gap-y-12 desktop:gap-y-11">
                <AdditionalInfo
                  className="tablet:col-start-1 tablet:row-start-1"
                  heading="Current timezone"
                  value={date.isSuccess ? date.data.timezone : nbsp}
                />
                <AdditionalInfo
                  className="tablet:col-start-1"
                  heading="Day of the year"
                  value={date.isSuccess ? date.data.day_of_year : nbsp}
                />
                <div className="col-start-2 row-span-full hidden justify-self-center border-l text-gray/25 desktop:block" />
                <AdditionalInfo
                  className="tablet:col-start-3 tablet:row-start-1"
                  heading="Day of the week"
                  value={date.isSuccess ? date.data.day_of_week : nbsp}
                />
                <AdditionalInfo
                  className="tablet:col-start-3"
                  heading="Week number"
                  value={date.isSuccess ? date.data.week_number : nbsp}
                />
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
        "center-[69.375rem] center-gutter-7 tablet:center-gutter-16",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface AdditionalInfoProps {
  heading: string;
  value: string | number;
  className?: string;
}

function AdditionalInfo({ className, heading, value }: AdditionalInfoProps) {
  return (
    <div
      className={cx(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-1 tablet:grid tablet:grid-rows-[auto_1fr] tablet:items-start tablet:gap-2",
        className,
      )}
    >
      <h4 className="text-h6 uppercase">{heading}</h4>
      <p className="text-h2">{value}</p>
    </div>
  );
}
