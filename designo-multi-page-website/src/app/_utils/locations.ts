import { invariant } from "@epic-web/invariant";
import { type LatLngTuple } from "leaflet";
import { getMediaImageProps } from "~/app/_utils/image";
import desktopMapAustraliaUrl from "~/app/locations/_assets/desktop/image-map-australia.png";
import desktopMapCanadaUrl from "~/app/locations/_assets/desktop/image-map-canada.png";
import desktopMapUnitedKingdomUrl from "~/app/locations/_assets/desktop/image-map-united-kingdom.png";
import tabletMapAustraliaUrl from "~/app/locations/_assets/tablet/image-map-australia.png";
import tabletMapCanadaUrl from "~/app/locations/_assets/tablet/image-map-canada.png";
import tabletMapUnitedKingdomUrl from "~/app/locations/_assets/tablet/image-map-uk.png";

const mapCanada = getMediaImageProps({
  alt: "",
  priority: true,
  breakpoint: {
    desktop: desktopMapCanadaUrl,
    // todo: Make optional
    tablet: tabletMapCanadaUrl,
    mobile: tabletMapCanadaUrl,
  },
});

const mapAustralia = getMediaImageProps({
  alt: "",
  priority: true,
  breakpoint: {
    desktop: desktopMapAustraliaUrl,
    // todo: Make optional
    tablet: tabletMapAustraliaUrl,
    mobile: tabletMapAustraliaUrl,
  },
});

const mapUnitedKingdom = getMediaImageProps({
  alt: "",
  priority: true,
  breakpoint: {
    desktop: desktopMapUnitedKingdomUrl,
    // todo: Make optional
    tablet: tabletMapUnitedKingdomUrl,
    mobile: tabletMapUnitedKingdomUrl,
  },
});

interface Location {
  fragmentId: string;
  country: "Canada" | "Australia" | "United Kingdom";
  address: {
    name: string;
    street: string;
    postCode: string;
  };
  phone: string;
  mail: string;
  map: typeof mapCanada;
  center: LatLngTuple;
}

export const locations: Location[] = [
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
    center: [43.70475, -79.245583],
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
    center: [-33.109333, 151.624472],
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
    center: [53.735306, -1.329889],
  },
];

export function createLocationHref(country: Location["country"]) {
  const location = locations.find((l) => l.country === country);
  // todo: Change data structure?
  invariant(location, "Location not found");
  return `/locations#${location.fragmentId}`;
}
