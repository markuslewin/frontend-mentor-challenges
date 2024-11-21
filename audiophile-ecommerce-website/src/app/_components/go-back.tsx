import Link from "next/link";

interface GoBackProps {
  href: string;
}

export function GoBack({ href }: GoBackProps) {
  return (
    <div className="center mt-4 tablet:mt-8 desktop:mt-20">
      <div>
        <Link className="transition-colors hocus:text-D87D4A" href={href}>
          Go Back
        </Link>
      </div>
    </div>
  );
}
