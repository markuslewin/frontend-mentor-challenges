import { useId } from "react";

function App() {
  const resultHeadingId = useId();
  const keypadHeadingId = useId();

  return (
    <div>
      <header>
        <h1>calc</h1>
        <fieldset>
          <legend>Theme</legend>
          <label>
            <input type="radio" name="theme" value="1" checked readOnly /> 1
          </label>
          <label>
            <input type="radio" name="theme" value="2" /> 2
          </label>
          <label>
            <input type="radio" name="theme" value="3" /> 3
          </label>
        </fieldset>
      </header>
      <main>
        <section aria-labelledby={resultHeadingId}>
          <h2 id={resultHeadingId}>Result</h2>
          <p>
            <output>399,981</output>
          </p>
        </section>
        <section aria-labelledby={keypadHeadingId}>
          <h2 id={keypadHeadingId}>Keypad</h2>
          <div role="grid">
            <div role="row">
              <div role="gridcell">
                <button type="button" onClick={() => console.log(7)}>
                  7
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(8)}>
                  8
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(9)}>
                  9
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Delete")}>
                  <span aria-hidden="true">del</span>
                  <span className="sr-only">Delete</span>
                </button>
              </div>
            </div>
            <div role="row">
              <div role="gridcell">
                <button type="button" onClick={() => console.log(4)}>
                  4
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(5)}>
                  5
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(6)}>
                  6
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Add")}>
                  <span aria-hidden="true">+</span>
                  <span className="sr-only">Add</span>
                </button>
              </div>
            </div>
            <div role="row">
              <div role="gridcell">
                <button type="button" onClick={() => console.log(1)}>
                  1
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(2)}>
                  2
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log(3)}>
                  3
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Subtract")}>
                  <span aria-hidden="true">-</span>
                  <span className="sr-only">Subtract</span>
                </button>
              </div>
            </div>
            <div role="row">
              <div role="gridcell">
                <button
                  type="button"
                  onClick={() => console.log("Decimal separator")}
                >
                  <span aria-hidden="true">.</span>
                  <span className="sr-only">Decimal separator</span>
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("0")}>
                  0
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Divide")}>
                  <span aria-hidden="true">/</span>
                  <span className="sr-only">Divide</span>
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Multiply")}>
                  <span aria-hidden="true">x</span>
                  <span className="sr-only">Multiply</span>
                </button>
              </div>
            </div>
            <div role="row">
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Reset")}>
                  Reset
                </button>
              </div>
              <div role="gridcell">
                <button type="button" onClick={() => console.log("Equals")}>
                  <span aria-hidden="true">=</span>
                  <span className="sr-only">Equals</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
