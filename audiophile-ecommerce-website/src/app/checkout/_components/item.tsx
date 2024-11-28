import { Slot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { currency } from "~/app/_utils/format";

interface RootProps {
  price: number;
  image: string;
  quantity: number;
  children: ReactNode;
}

export const Root = ({ price, image, quantity, children }: RootProps) => {
  return (
    <li className="grid grid-cols-[auto_1fr] items-center gap-4 font-bold">
      <div>
        <div className="flex justify-between">
          {children}
          <p>x{quantity}</p>
        </div>
        <p>{currency(price)}</p>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="order-first size-16 rounded object-cover"
        alt=""
        width={150}
        height={150}
        src={image}
      />
    </li>
  );
};

type AsChild<T> = T & {
  asChild?: boolean;
};

type HeadingProps = AsChild<ComponentPropsWithoutRef<"h3">>;

export const Heading = ({ asChild, ...props }: HeadingProps) => {
  const Comp = asChild ? Slot : "h3";
  return <Comp className="text-000000" {...props} />;
};
