import * as Landmark from "#app/components/landmark";
import { Icon } from "#app/components/icon";
import { Image, Picture, Source } from "#app/components/picture";
// @ts-expect-error Search params
import desktopBgDaytime from "#app/assets/desktop/bg-image-daytime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import tabletBgDaytime from "#app/assets/tablet/bg-image-daytime.jpg?format=webp&as=metadata";
// @ts-expect-error Search params
import mobileBgDaytime from "#app/assets/mobile/bg-image-daytime.jpg?format=webp&as=metadata";
import { screens } from "#app/utils/screens";

export function Home() {
  return (
    <div className="relative isolate min-h-screen">
      <div className="absolute inset-0 isolate -z-10">
        <Picture>
          <Source
            media={`(min-width: ${screens.desktop})`}
            image={desktopBgDaytime}
          />
          <Source
            media={`(min-width: ${screens.tablet})`}
            image={tabletBgDaytime}
          />
          <Image
            className="absolute inset-0 size-full object-cover"
            alt=""
            image={mobileBgDaytime}
          />
        </Picture>
        <div className="bg-black/40 absolute inset-0" />
      </div>
      <h1>Clock app</h1>
      <Landmark.Root>
        <Landmark.Label>
          <h2>Quote</h2>
        </Landmark.Label>
        <blockquote>
          <p>
            “The science of operations, as derived from mathematics more
            especially, is a science of itself, and has its own abstract truth
            and value.”
          </p>
          <footer>
            <p>Ada Lovelace</p>
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
            <span>Get a new quote</span>
          </button>
        </form>
      </Landmark.Root>
      <Landmark.Root>
        <Landmark.Label>
          <h2>Time</h2>
        </Landmark.Label>
        <p>
          <span>
            {/* <Icon
            className="h-6 w-auto"
            name="icon-moon"
            width="23"
            height="24"
          /> */}
            <Icon className="size-6" name="icon-sun" /> Good morning, it’s
            currently
          </span>{" "}
          <span>
            <strong>11:37</strong> BST
          </span>{" "}
          <span>in London, UK</span>
        </p>
        <form>
          <button className="bg-white text-black/50">
            More{" "}
            <Icon
              className="bg-gray text-white h-[0.4375rem] w-auto tablet:h-[0.5625rem]"
              name="icon-arrow-down"
              width="14"
              height="9"
            />
          </button>
        </form>
        <Landmark.Root className="bg-white/75 text-black">
          <Landmark.Label>
            <h3>Additional information</h3>
          </Landmark.Label>
          <div>
            <h4>Current timezone</h4>
            <p>Europe/London</p>
            <h4>Day of the year</h4>
            <p>295</p>
            <h4>Day of the week</h4>
            <p>5</p>
            <h4>Week number</h4>
            <p>42</p>
          </div>
        </Landmark.Root>
      </Landmark.Root>
    </div>
  );
}
