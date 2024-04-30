import { Icon } from "./components/icon";

function App() {
  return (
    <>
      <header>
        <div className="flex flex-wrap">
          <div className="flex flex-wrap">
            <div>
              <Icon className="w-[8.625rem] h-5" name="logo" />
              <p className="sr-only">Sneakers</p>
            </div>
            <nav>
              <button className="tablet:hidden" type="button">
                <Icon className="w-4 h-[0.9375rem]" name="icon-menu" />
                <span className="sr-only"> Menu</span>
              </button>
              <ul className="hidden tablet:flex" role="list">
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
          <div className="flex flex-wrap">
            <p>
              <button type="button">
                <Icon className="w-[1.375rem] h-5" name="icon-cart" />
                <span className="sr-only"> Cart</span>
              </button>
            </p>
            <p>
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
        <div className="grid tablet:grid-cols-2">
          <div className="order-1">
            <h1 className="grid">
              Sneaker Company<span className="sr-only">: </span>
              <span>Fall Limited Edition Sneakers</span>
            </h1>
            <p>
              These low-profile sneakers are your perfect casual wear companion.
              Featuring a durable rubber outer sole, they’ll withstand
              everything the weather can offer.
            </p>
            <h2 className="sr-only">Price</h2>
            <div className="flex flex-wrap tablet:flex-col">
              <p className="flex flex-wrap">
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
            <div className="flex flex-col flex-wrap tablet:flex-row">
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
            <ul className="hidden tablet:grid grid-cols-4" role="list">
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
