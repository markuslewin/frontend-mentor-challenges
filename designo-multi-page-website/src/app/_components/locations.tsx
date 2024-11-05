import Image from "next/image";
import Link from "next/link";
import illustrationAustraliaUrl from "~/app/_assets/illustration-australia.svg";
import illustrationCanadaUrl from "~/app/_assets/illustration-canada.svg";
import illustrationUnitedKingdomUrl from "~/app/_assets/illustration-united-kingdom.svg";

export function Locations() {
  return (
    <div className="mx-auto mt-32 box-content grid max-w-[60rem] gap-12 text-center desktop:mt-40 desktop:grid-cols-3 desktop:gap-0">
      <h2 className="sr-only">Locations</h2>
      <div className="grid justify-items-center">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationCanadaUrl} />
        <h3 className="mt-12 text-h3 uppercase">Canada</h3>
        <p className="mt-8 grid">
          {/* todo: Hash */}
          <Link className="button-peach" href="/locations">
            See location
          </Link>
        </p>
      </div>
      <div className="grid justify-items-center">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationAustraliaUrl} />
        <h3 className="mt-12 text-h3 uppercase">Australia</h3>
        <p className="mt-8 grid">
          <Link className="button-peach" href="/locations">
            See location
          </Link>
        </p>
      </div>
      <div className="grid justify-items-center">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Image alt="" src={illustrationUnitedKingdomUrl} />
        <h3 className="mt-12 text-h3 uppercase">United Kingdom</h3>
        <p className="mt-8 grid">
          <Link className="button-peach" href="/locations">
            See location
          </Link>
        </p>
      </div>
    </div>
  );
}
