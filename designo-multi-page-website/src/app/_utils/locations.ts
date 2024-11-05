import { invariant } from "@epic-web/invariant";
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

export const locations = [
  {
    fragmentId: "canada",
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
    fragmentId: "australia",
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
    fragmentId: "united-kingdom",
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
] as const;

type Location = (typeof locations)[number];

export function createLocationHref(country: Location["country"]) {
  const location = locations.find((l) => l.country === country);
  // todo: Change data structure?
  invariant(location, "Location not found");
  return `/locations#${location.fragmentId}`;
}
