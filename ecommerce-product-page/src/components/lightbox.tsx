import * as Dialog from "@radix-ui/react-dialog";
import { Icon } from "./icon";
import "./lightbox.css";
import { images } from "../utils/product-images/images";
import { ControlButton } from "./buttons";

export const Root = Dialog.Root;

export const Trigger = Dialog.Trigger;

export function Portal({
  index,
  current,
  onPrevious,
  onNext,
  onImageClick,
}: {
  index: number;
  current: (typeof images)[number];
  onPrevious(): void;
  onNext(): void;
  onImageClick(index: number): void;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="lightbox__overlay">
        <Dialog.Content
          className="lightbox__content center center--sm w-full"
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
                  <ControlButton type="button" onClick={onPrevious}>
                    <Icon
                      className="w-[0.8125rem] h-[1.125rem] -translate-x-[0.0625rem]"
                      name="icon-previous"
                    />
                    <span className="sr-only">Previous image</span>
                  </ControlButton>
                </li>
                <li>
                  <ControlButton type="button" onClick={onNext}>
                    <Icon
                      className="w-[0.8125rem] h-[1.125rem] translate-x-[0.0625rem]"
                      name="icon-next"
                    />
                    <span className="sr-only">Next image</span>
                  </ControlButton>
                </li>
              </ul>
            </header>
            <p className="lightbox__stage" aria-live="polite">
              <img
                className="lightbox__large"
                alt={current.description}
                width={current.width}
                height={current.height}
                src={current.src}
              />
            </p>
            <ul className="lightbox__thumbnails" role="list">
              {images.map((image, i) => (
                <li key={i}>
                  <button
                    className="thumbnail block"
                    type="button"
                    aria-current={i === index}
                    onClick={() => onImageClick(i)}
                  >
                    <img
                      className="lightbox__thumbnail thumbnail__img"
                      alt={`Product image ${i + 1}`}
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
  );
}
