import { Icon } from "./components/icon";

function App() {
  return (
    <>
      <header>
        <div>
          <Icon className="w-[8.625rem] h-5" name="logo" />
          <p>Sneakers</p>
        </div>
        <nav>
          {/* <button type="button">
            <Icon name="icon-menu" /> Menu
          </button> */}
          <ul>
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
        <p>
          <button type="button">
            <Icon className="w-[1.375rem] h-5" name="icon-cart" /> Cart
          </button>
        </p>
        <p>
          <a href="#">Profile</a>
        </p>
      </header>
      <main>
        <div>
          <h1>
            Sneaker Company<span>: </span>
            <span>Fall Limited Edition Sneakers</span>
          </h1>
          <p>
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they’ll withstand everything
            the weather can offer.
          </p>
          <h2>Price</h2>
          <p>
            <span>Current price: </span>
            <strong>$125.00</strong>
            <span>50% off</span>
          </p>
          <p>
            <span>Original price: </span>
            <s>$250.00</s>
          </p>
          <h2>Add to cart</h2>
          <p>
            <button type="button">
              <Icon className="w-3 h-1" name="icon-minus" /> Decrement quantity
            </button>
            <span aria-live="assertive">0</span>
            <button type="button">
              <Icon className="size-3" name="icon-plus" /> Increment quantity
            </button>
          </p>
          <p>
            <button type="button">
              <Icon className="w-[1.1rem] h-4" name="icon-cart" /> Add to cart
            </button>
          </p>
        </div>
        <div>
          <h2>Images</h2>
          <p aria-live="assertive">
            <img
              alt="todo: Description of image 1"
              src="/images/image-product-1.jpg"
            />
          </p>
          <ul>
            <li>
              <button type="button">
                <img
                  alt="Image 1"
                  src="/images/image-product-1-thumbnail.jpg"
                />
              </button>
            </li>
            <li>
              <button type="button">
                <img
                  alt="Image 2"
                  src="/images/image-product-2-thumbnail.jpg"
                />
              </button>
            </li>
            <li>
              <button type="button">
                <img
                  alt="Image 3"
                  src="/images/image-product-3-thumbnail.jpg"
                />
              </button>
            </li>
            <li>
              <button type="button">
                <img
                  alt="Image 4"
                  src="/images/image-product-4-thumbnail.jpg"
                />
              </button>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
