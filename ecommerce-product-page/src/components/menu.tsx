import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./icon";
import "./menu.css";

export function Menu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="menu__trigger">
        <Icon className="w-4 h-[0.9375rem]" name="icon-menu" />
        <span className="sr-only"> Open menu</span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="menu__overlay" />
        <Dialog.Content className="menu__content" aria-describedby={undefined}>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Close className="menu__close">
            <Icon className="menu__close-icon" name="icon-close" />
            <span className="sr-only"> Close menu</span>
          </Dialog.Close>
          <ul className="menu__items mt-14" role="list">
            <li>
              <a className="menu__item" href="#">
                Collections
              </a>
            </li>
            <li>
              <a className="menu__item" href="#">
                Men
              </a>
            </li>
            <li>
              <a className="menu__item" href="#">
                Women
              </a>
            </li>
            <li>
              <a className="menu__item" href="#">
                About
              </a>
            </li>
            <li>
              <a className="menu__item" href="#">
                Contact
              </a>
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
