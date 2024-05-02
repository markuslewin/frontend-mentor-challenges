import { Icon } from "./components/icon";
import "./App.css";
import * as Lightbox from "./components/lightbox";
import * as Cart from "./components/cart";
import { images, useCurrentImage } from "./utils/product-images/images";
import { useCart, useQuantity } from "./utils/cart";
import { PrimaryButton } from "./components/buttons";
import { useMedia } from "./utils/use-media";
import { screens } from "./utils/screens";

function App() {
  const tabletMatches = useMedia(`(min-width: ${screens.tablet})`);
  const productImage = useCurrentImage(images);
  const lightboxImage = useCurrentImage(images);
  const cart = useCart();
  const quantity = useQuantity();

  return (
    <div className="pb-20 tablet:pb-32">
      <header>
        <div className="center gutter">
          <div className="header flex justify-between items-center flex-wrap tablet:flex-nowrap">
            <div className="flex items-center flex-wrap gap-4 tablet:flex-nowrap tablet:gap-14">
              <div className="header__logo order-1 tablet:order-none">
                <Icon className="w-[8.625rem] h-5" name="logo" />
                <p className="sr-only">Sneakers</p>
              </div>
              <nav>
                <button
                  className="translate-y-[0.1875rem] tablet:hidden"
                  type="button"
                >
                  <Icon className="w-4 h-[0.9375rem]" name="icon-menu" />
                  <span className="sr-only"> Menu</span>
                </button>
                <ul
                  className="hidden gap-5 tablet:py-[2.5625rem] tablet:flex tablet:gap-8"
                  role="list"
                >
                  <li>
                    <a href="#">Collections</a>
                  </li>
                  <li>
                    <a href="#">Men</a>
                  </li>
                  <li>
                    <a href="#">Women</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex items-center flex-wrap gap-4 tablet:flex-nowrap tablet:gap-10">
              <p aria-live="polite">
                <Cart.Root>
                  <Cart.Trigger className="cart-button">
                    <Icon
                      className="cart-button__icon w-[1.375rem] h-5"
                      name="icon-cart"
                    />
                    {cart.quantity ? (
                      <span className="cart-button__badge">
                        {cart.quantity}
                      </span>
                    ) : (
                      <span className="sr-only">0</span>
                    )}
                    <span className="sr-only"> items in the cart</span>
                  </Cart.Trigger>
                  <Cart.Portal
                    quantity={cart.quantity}
                    onRemove={() => cart.reset()}
                  />
                </Cart.Root>
              </p>
              <p className="shrink-0">
                <a href="#">
                  <img
                    className="size-6 tablet:size-[3.125rem]"
                    alt="Profile"
                    width={100}
                    height={100}
                    src="/images/image-avatar.png"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="tablet:mt-[5.625rem]">
        <div className="product__columns center center-md tablet:gutter grid gap-6">
          <div className="product__text order-1 gutter tablet:gutter-none">
            <div>
              <h1 className="product__subheading grid gap-5 tablet:gap-7">
                Sneaker Company<span className="sr-only">: </span>
                <span className="product__heading">
                  Fall Limited Edition Sneakers
                </span>
              </h1>
              <p className="mt-4 tablet:mt-8">
                These low-profile sneakers are your perfect casual wear
                companion. Featuring a durable rubber outer sole, they’ll
                withstand everything the weather can offer.
              </p>
              <h2 className="sr-only">Price</h2>
              <div className="mt-6 flex justify-between flex-wrap gap-4 tablet:mt-7 tablet:flex-col tablet:gap-[0.625rem]">
                <p className="flex items-center flex-wrap gap-4">
                  <span className="sr-only">Current price: </span>
                  <strong className="product__current-price">$125.00</strong>
                  <span className="product__discount">
                    <span className="sr-only"> (</span>50%
                    <span className="sr-only">) off</span>
                  </span>
                </p>
                <p className="product__original-price">
                  <span className="sr-only">Original price: </span>
                  <s>$250.00</s>
                </p>
              </div>
              <h2 className="sr-only">Add to cart</h2>
              <div className="mt-6 flex flex-col flex-wrap gap-4 tablet:mt-8 tablet:flex-row">
                <p className="quantity-selector">
                  <button
                    className="quantity-selector__button"
                    type="button"
                    onClick={() => quantity.decrement()}
                  >
                    <Icon className="w-3 h-1" name="icon-minus" />
                    <span className="sr-only"> Decrement quantity</span>
                  </button>
                  <span
                    className="quantity-selector__quantity"
                    aria-live="polite"
                  >
                    <span className="sr-only">Quantity: </span>
                    {quantity.value}
                  </span>
                  <button
                    className="quantity-selector__button"
                    type="button"
                    onClick={() => quantity.increment()}
                  >
                    <Icon className="size-3" name="icon-plus" />
                    <span className="sr-only"> Increment quantity</span>
                  </button>
                </p>
                <p className="grow">
                  <PrimaryButton
                    type="button"
                    onClick={() => {
                      cart.add(quantity.value);
                      quantity.reset();
                    }}
                  >
                    <Icon className="w-[1.1rem] h-4" name="icon-cart" /> Add to
                    cart
                  </PrimaryButton>
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="sr-only">Images</h2>
            {tabletMatches ? (
              <>
                <Lightbox.Root>
                  <Lightbox.Trigger
                    className="block"
                    aria-description="Opens lightbox gallery"
                    onClick={() => lightboxImage.setIndex(productImage.index)}
                  >
                    <p aria-live="polite">
                      <img
                        className="images__main"
                        alt={productImage.current.description}
                        width={productImage.current.width}
                        height={productImage.current.height}
                        src={productImage.current.src}
                      />
                    </p>
                  </Lightbox.Trigger>
                  <Lightbox.Portal
                    index={lightboxImage.index}
                    current={lightboxImage.current}
                    onPrevious={lightboxImage.previous}
                    onNext={lightboxImage.next}
                    onImageClick={lightboxImage.setIndex}
                  />
                </Lightbox.Root>
                <ul className="images__thumbnails mt-8" role="list">
                  {images.map((image, i) => (
                    <li key={i}>
                      <button
                        className="block"
                        type="button"
                        aria-current={i === productImage.index}
                        onClick={() => productImage.setIndex(i)}
                      >
                        <img
                          className="images__thumbnail"
                          alt={`Product image ${i + 1}`}
                          width={image.thumbnail.width}
                          height={image.thumbnail.height}
                          src={image.thumbnail.src}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <article className="images">
                <header className="images__header">
                  <ul className="images__controls" role="list">
                    <li>
                      <button
                        className="bg-white text-very-dark-blue rounded-full size-10 grid place-items-center"
                        type="button"
                        onClick={() => productImage.previous()}
                      >
                        <Icon
                          className="w-[0.625rem] h-[0.875rem]"
                          name="icon-previous"
                        />
                        <span className="sr-only">Previous image</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="bg-white text-very-dark-blue rounded-full size-10 grid place-items-center"
                        type="button"
                        onClick={() => productImage.next()}
                      >
                        <Icon
                          className="w-[0.625rem] h-[0.875rem]"
                          name="icon-next"
                        />
                        <span className="sr-only">Next image</span>
                      </button>
                    </li>
                  </ul>
                </header>
                <p className="images__stage" aria-live="polite">
                  <img
                    className="images__main"
                    alt={productImage.current.description}
                    width={productImage.current.width}
                    height={productImage.current.height}
                    src={productImage.current.src}
                  />
                </p>
              </article>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
