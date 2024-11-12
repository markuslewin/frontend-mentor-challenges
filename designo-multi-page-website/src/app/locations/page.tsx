import { type Metadata } from "next";
import { OverlaidFooter } from "~/app/_components/footer";
import { GetInTouch } from "~/app/_components/get-in-touch";
import { locations } from "~/app/_utils/locations";
import { Map } from "~/app/_components/map";

export const metadata: Metadata = {
  title: "Locations",
};

export default function LocationsPage() {
  return (
    <>
      <main>
        <h1 className="sr-only">Locations</h1>
        <div className="center tablet:px-gutter px-0">
          {locations.map((location, i) => {
            return (
              <div
                className={[
                  "grid tablet:scroll-my-8 tablet:grid-rows-2 tablet:gap-8 tablet:rounded desktop:grid-rows-none",
                  i > 0 ? "mt-10 tablet:mt-32 desktop:mt-8" : "",
                  i % 2 === 0
                    ? "desktop:grid-cols-[730fr_350fr]"
                    : "desktop:grid-cols-[350fr_730fr]",
                ].join(" ")}
                key={i}
                id={location.fragmentId}
              >
                <div className="grid items-center bg-[hsl(14_76%_97%)] bg-bg-pattern-three-circles bg-[length:36.5rem] bg-no-repeat py-20 tablet:rounded tablet:bg-left-bottom tablet:py-[5.5rem]">
                  <div className="grid text-center tablet:grid-cols-[75fr_540fr_75fr] tablet:text-start desktop:grid-cols-[95fr_540fr_95fr]">
                    <div className="tablet:col-start-2">
                      <h2 className="text-h2 tracking-normal text-peach">
                        {location.country}
                      </h2>
                      <div className="mt-6 grid gap-6 tablet:grid-cols-2 tablet:gap-8">
                        <h3 className="sr-only">Address</h3>
                        <p>
                          <strong>{location.address.name}</strong>
                          <br />
                          {location.address.street}
                          <br />
                          {location.address.postCode}
                        </p>
                        <div>
                          <h3 className="font-bold">Contact</h3>
                          <p>
                            P<span className="sr-only">hone</span> :{" "}
                            <a href={`tel:${location.phone}`}>
                              {location.phone}
                            </a>
                          </p>
                          <p>
                            M<span className="sr-only">ail</span> :{" "}
                            <a href={`mailto:${location.mail}`}>
                              {location.mail}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={[
                    "relative isolate order-first aspect-[375/320] overflow-hidden tablet:aspect-auto tablet:rounded",
                    i % 2 === 0 ? "desktop:order-last" : "",
                  ].join(" ")}
                >
                  <picture>
                    <source {...location.map.desktopSourceProps} />
                    <img
                      className="absolute inset-0 size-full object-cover"
                      {...location.map.mobileImageProps}
                    />
                  </picture>
                  <Map
                    className="absolute inset-0 isolate"
                    center={location.center}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <GetInTouch className="mt-32 desktop:mt-40" />
      </main>
      <OverlaidFooter />
    </>
  );
}
