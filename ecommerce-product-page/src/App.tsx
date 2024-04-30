import { Icon } from "./components/icon";

function App() {
  return (
    <>
      <header>
        <div className="flex justify-between items-center flex-wrap tablet:flex-nowrap">
          <div className="flex items-center flex-wrap gap-14 tablet:flex-nowrap">
            <div>
              <Icon className="w-[8.625rem] h-5" name="logo" />
              <p className="sr-only">Sneakers</p>
            </div>
            <nav>
              <button className="tablet:hidden" type="button">
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
          <div className="flex items-center flex-wrap gap-10">
            <p>
              <button type="button">
                <Icon className="w-[1.375rem] h-5" name="icon-cart" />
                <span className="sr-only"> Cart</span>
              </button>
            </p>
            <p className="shrink-0">
              <a href="#">
                <img
                  className="size-5 tablet:size-[3.125rem]"
                  alt="Profile"
                  width={100}
                  height={100}
                  src="/images/image-avatar.png"
                />
              </a>
            </p>
          </div>
        </div>
      </header>
      <main>
        <div className="grid gap-6 tablet:grid-cols-2 tablet:gap-0">
          <div className="order-1">
            <h1 className="tablet:mt-16 grid gap-5 tablet:gap-7">
              Sneaker Company<span className="sr-only">: </span>
              <span>Fall Limited Edition Sneakers</span>
            </h1>
            <p className="mt-4 tablet:mt-8">
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
            <h2 className="sr-only">Price</h2>
            <div className="mt-6 flex flex-wrap gap-4 tablet:mt-7 tablet:flex-col tablet:gap-[0.625rem]">
              <p className="flex flex-wrap gap-4">
                <span className="sr-only">Current price: </span>
                <strong>$125.00</strong>
                <span>
                  <span className="sr-only"> (</span>50%
                  <span className="sr-only">) off</span>
                </span>
              </p>
              <p>
                <span className="sr-only">Original price: </span>
                <s>$250.00</s>
              </p>
            </div>
            <h2 className="sr-only">Add to cart</h2>
            <div className="mt-6 flex flex-col flex-wrap gap-4 tablet:mt-8 tablet:flex-row">
              <p className="grid grid-cols-3">
                <button type="button">
                  <Icon className="w-3 h-1" name="icon-minus" />
                  <span className="sr-only"> Decrement quantity</span>
                </button>
                <span aria-live="assertive">0</span>
                <button type="button">
                  <Icon className="size-3" name="icon-plus" />
                  <span className="sr-only"> Increment quantity</span>
                </button>
              </p>
              <p>
                <button className="flex flex-wrap" type="button">
                  <Icon className="w-[1.1rem] h-4" name="icon-cart" /> Add to
                  cart
                </button>
              </p>
            </div>
          </div>
          <div>
            <h2 className="sr-only">Images</h2>
            <p aria-live="assertive">
              <img
                alt="todo: Description of image 1"
                width={1000}
                height={1000}
                src="/images/image-product-1.jpg"
              />
            </p>
            <ul
              className="mt-8 hidden tablet:grid grid-cols-4 gap-8"
              role="list"
            >
              <li>
                <button type="button">
                  <img
                    alt="Image 1"
                    width={176}
                    height={176}
                    src="/images/image-product-1-thumbnail.jpg"
                  />
                </button>
              </li>
              <li>
                <button type="button">
                  <img
                    alt="Image 2"
                    width={176}
                    height={176}
                    src="/images/image-product-2-thumbnail.jpg"
                  />
                </button>
              </li>
              <li>
                <button type="button">
                  <img
                    alt="Image 3"
                    width={176}
                    height={176}
                    src="/images/image-product-3-thumbnail.jpg"
                  />
                </button>
              </li>
              <li>
                <button type="button">
                  <img
                    alt="Image 4"
                    width={176}
                    height={176}
                    src="/images/image-product-4-thumbnail.jpg"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
