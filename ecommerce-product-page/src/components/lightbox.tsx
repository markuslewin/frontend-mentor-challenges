import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Icon } from "./icon";
import "./lightbox.css";
import { images } from "../utils/product-images/images";

export function Lightbox({ children }: { children: ReactNode }) {
  const large = images[0];

  return (
    <Dialog.Root>
      <Dialog.Trigger className="block">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox__overlay">
          <Dialog.Content
            className="lightbox__content center center-sm w-full"
            aria-describedby={undefined}
          >
            <Dialog.Title className="sr-only">Lightbox gallery</Dialog.Title>
            <div className="lightbox__padding grid justify-end">
              <Dialog.Close className="lightbox__close">
                <Icon className="size-5" name="icon-close" />
                <span className="sr-only">Close lightbox gallery</span>
              </Dialog.Close>
            </div>
            <article className="lightbox__gallery mt-6">
              <header className="lightbox__header">
                <ul className="lightbox__controls" role="list">
                  <li>
                    <button
                      className="bg-white text-very-dark-blue rounded-full size-14 grid place-items-center"
                      type="button"
                    >
                      <Icon
                        className="w-[0.8125rem] h-[1.125rem]"
                        name="icon-previous"
                      />
                      <span className="sr-only">Previous image</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className="bg-white text-very-dark-blue rounded-full size-14 grid place-items-center"
                      type="button"
                    >
                      <Icon
                        className="w-[0.8125rem] h-[1.125rem]"
                        name="icon-next"
                      />
                      <span className="sr-only">Next image</span>
                    </button>
                  </li>
                </ul>
              </header>
              <div className="lightbox__stage">
                <img
                  className="lightbox__large"
                  alt="todo"
                  width={large.width}
                  height={large.height}
                  src={large.src}
                />
              </div>
              <ul className="lightbox__thumbnails" role="list">
                {images.map((image, i) => (
                  <li key={i}>
                    <button className="block" type="button">
                      <img
                        className="lightbox__thumbnail"
                        alt="todo"
                        width={image.thumbnail.width}
                        height={image.thumbnail.height}
                        src={image.thumbnail.src}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
