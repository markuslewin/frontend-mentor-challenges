import { type Metadata } from "next";
import { OverlaidFooter } from "~/app/_components/footer";
import { GetInTouch } from "~/app/_components/get-in-touch";
import { locations } from "~/app/_utils/locations";

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
                <div className="grid items-center bg-[hsl(14_76%_97%)] py-20 tablet:rounded">
                  <div className="grid text-center tablet:grid-cols-[75fr_540fr_75fr] tablet:text-start desktop:grid-cols-[95fr_540fr_95fr]">
                    <div className="tablet:col-start-2">
                      <h2 className="text-h2 text-peach">{location.country}</h2>
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
                <picture
                  className={[
                    "relative order-first",
                    i % 2 === 0 ? "desktop:order-last" : "",
                  ].join(" ")}
                >
                  <source {...location.map.desktopSourceProps} />
                  <img
                    className="aspect-[375/320] size-full object-cover tablet:absolute tablet:aspect-auto tablet:rounded desktop:block"
                    {...location.map.mobileImageProps}
                  />
                </picture>
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
