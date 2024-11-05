import { GetInTouch } from "~/app/_components/get-in-touch";
import { getMediaImageProps } from "~/app/_utils/image";
import desktopMapAustraliaUrl from "~/app/locations/_assets/desktop/image-map-australia.png";
import desktopMapCanadaUrl from "~/app/locations/_assets/desktop/image-map-canada.png";
import desktopMapUnitedKingdomUrl from "~/app/locations/_assets/desktop/image-map-united-kingdom.png";
import tabletMapAustraliaUrl from "~/app/locations/_assets/tablet/image-map-australia.png";
import tabletMapCanadaUrl from "~/app/locations/_assets/tablet/image-map-canada.png";
import tabletMapUnitedKingdomUrl from "~/app/locations/_assets/tablet/image-map-uk.png";

const mapAustralia = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: desktopMapAustraliaUrl,
    // todo: Make optional
    tablet: tabletMapAustraliaUrl,
    mobile: tabletMapAustraliaUrl,
  },
});

const mapCanada = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: desktopMapCanadaUrl,
    // todo: Make optional
    tablet: tabletMapCanadaUrl,
    mobile: tabletMapCanadaUrl,
  },
});

const mapUnitedKingdom = getMediaImageProps({
  alt: "",
  breakpoint: {
    desktop: desktopMapUnitedKingdomUrl,
    // todo: Make optional
    tablet: tabletMapUnitedKingdomUrl,
    mobile: tabletMapUnitedKingdomUrl,
  },
});

interface Location {
  country: string;
  address: {
    name: string;
    street: string;
    postCode: string;
  };
  phone: string;
  mail: string;
  map: typeof mapCanada;
}

const locations: Location[] = [
  {
    country: "Canada",
    address: {
      name: "Designo Central Office",
      street: "3886 Wellington Street",
      postCode: "Toronto, Ontario M9C 3J5",
    },
    phone: "+1 253-863-8967",
    mail: "contact@designo.co",
    map: mapCanada,
  },
  {
    country: "Australia",
    address: {
      name: "Designo AU Office",
      street: "19 Balonne Street",
      postCode: "New South Wales 2443",
    },
    phone: "(02) 6720 9092",
    mail: "contact@designo.au",
    map: mapAustralia,
  },
  {
    country: "United Kingdom",
    address: {
      name: "Designo UK Office",
      street: "13 Colorado Way",
      postCode: "Rhyd-y-fro SA8 9GA",
    },
    phone: "078 3115 1400",
    mail: "contact@designo.uk",
    map: mapUnitedKingdom,
  },
];

export default function LocationsPage() {
  return (
    <>
      <h1 className="sr-only">Locations</h1>
      <div className="center tablet:px-gutter px-0">
        {locations.map((location, i) => {
          return (
            <div
              className={[
                "grid tablet:grid-rows-2 tablet:gap-8 tablet:rounded desktop:grid-rows-none",
                i > 0 ? "mt-10 tablet:mt-32 desktop:mt-8" : "",
                i % 2 === 0
                  ? "desktop:grid-cols-[730fr_350fr]"
                  : "desktop:grid-cols-[350fr_730fr]",
              ].join(" ")}
              key={i}
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
                          <a href={`tel:${location.phone}`}>{location.phone}</a>
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
    </>
  );
}
