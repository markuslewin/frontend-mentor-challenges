import Image from "next/image";
import Link from "next/link";
import illustrationAustraliaUrl from "~/app/_assets/illustration-australia.svg";
import illustrationCanadaUrl from "~/app/_assets/illustration-canada.svg";
import illustrationUnitedKingdomUrl from "~/app/_assets/illustration-united-kingdom.svg";
import { BgPatternSmallCircle } from "~/app/_components/bg-pattern-small-circle";
import { createLocationHref } from "~/app/_utils/locations";

export function Locations() {
  return (
    <div className="center mt-32 grid gap-12 text-center desktop:mt-40 desktop:grid-cols-3 desktop:gap-8">
      <h2 className="sr-only">Locations</h2>
      <div className="grid justify-items-center">
        <div className="relative isolate">
          <BgPatternSmallCircle className="rotate-90" />
          <Image
            className="h-auto w-[12.625rem]"
            alt=""
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={illustrationCanadaUrl}
          />
        </div>
        <h3 className="mt-12 text-h3 uppercase">Canada</h3>
        <p className="mt-8 flex justify-center justify-self-stretch">
          <Link className="button-peach" href={createLocationHref("Canada")}>
            See location
          </Link>
        </p>
      </div>
      <div className="grid justify-items-center">
        <div className="relative isolate">
          <BgPatternSmallCircle className="" />
          <Image
            className="h-auto w-[12.625rem]"
            alt=""
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={illustrationAustraliaUrl}
          />
        </div>
        <h3 className="mt-12 text-h3 uppercase">Australia</h3>
        <p className="mt-8 flex justify-center justify-self-stretch">
          <Link className="button-peach" href={createLocationHref("Australia")}>
            See location
          </Link>
        </p>
      </div>
      <div className="grid justify-items-center">
        <div className="relative isolate">
          <BgPatternSmallCircle className="-rotate-90" />
          <Image
            className="h-auto w-[12.625rem]"
            alt=""
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={illustrationUnitedKingdomUrl}
          />
        </div>
        <h3 className="mt-12 text-h3 uppercase">United Kingdom</h3>
        <p className="mt-8 flex justify-center justify-self-stretch">
          <Link
            className="button-peach"
            href={createLocationHref("United Kingdom")}
          >
            See location
          </Link>
        </p>
      </div>
    </div>
  );
}
