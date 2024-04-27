import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./icon";
import { Link, LinkProps } from "react-router-dom";
import { ReactNode, useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger className="tablet:hidden clickable-12">
        <Icon className="w-6 h-[1.3125rem]" name="icon-hamburger" />
        <span className="sr-only">Open menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content
          className="glassy__surface text-FFFFFF font-barlow-condensed text-nav-text uppercase fixed top-0 right-0 bottom-0 p-8 w-[15.875rem] max-w-full overflow-y-scroll"
          aria-describedby={undefined}
        >
          <div className="grid justify-end">
            <Dialog.Close className="translate-x-[0.375rem] translate-y-[0.0625rem] clickable-12">
              <Icon className="w-5 h-[1.3125rem]" name="icon-close" />
              <span className="sr-only">Close menu</span>
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <ol className="mt-16 grid gap-8">
            <li>
              <MyLink to="/" onClick={() => setIsOpen(false)}>
                <Number>00</Number>
                Home
              </MyLink>
            </li>
            <li>
              <MyLink to="/destination" onClick={() => setIsOpen(false)}>
                <Number>01</Number>
                Destination
              </MyLink>
            </li>
            <li>
              <MyLink to="/crew" onClick={() => setIsOpen(false)}>
                <Number>02</Number>
                Crew
              </MyLink>
            </li>
            <li>
              <MyLink to="/technology" onClick={() => setIsOpen(false)}>
                <Number>03</Number>
                Technology
              </MyLink>
            </li>
          </ol>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MyLink(props: LinkProps) {
  return <Link className="grid grid-cols-[1.8125rem_1fr]" {...props} />;
}

function Number({ children }: { children: ReactNode }) {
  return <span className="font-bold">{children}</span>;
}
