import { cva } from "class-variance-authority";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
} from "react";
import { useCalculator } from "./utils/calculator";

function App() {
  const screenHeadingId = useId();
  const keypadHeadingId = useId();
  const [theme, setTheme] = useState(1);
  const calculator = useCalculator();

  useEffect(() => {
    document.documentElement.dataset.theme = theme.toString();
  }, [theme]);

  return (
    <div className="center min-h-screen px-6 py-8">
      <header className="flex flex-wrap justify-between items-end">
        <h1 className="text-fcalc">calc</h1>
        <fieldset>
          <legend className="sr-only">Theme</legend>
          <div className="toggle text-ftheme uppercase" data-theme={theme}>
            <p className="toggle__legend" aria-hidden="true">
              Theme
            </p>
            <div className="toggle__gutter">
              <div className="toggle__thumb" />
            </div>
            <label className="toggle__one">
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value="1"
                checked={theme === 1}
                onChange={() => setTheme(1)}
              />
              <Nudge x={1}>1</Nudge>
            </label>
            <label className="toggle__two">
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value="2"
                checked={theme === 2}
                onChange={() => setTheme(2)}
              />
              <Nudge x={1}>2</Nudge>
            </label>
            <label className="toggle__three">
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value="3"
                checked={theme === 3}
                onChange={() => setTheme(3)}
              />
              <Nudge x={-1}>3</Nudge>
            </label>
          </div>
        </fieldset>
      </header>
      <main className="grid gap-6">
        <section
          className="overflow-x-hidden"
          aria-labelledby={screenHeadingId}
        >
          <h2 className="sr-only" id={screenHeadingId}>
            Screen
          </h2>
          <p className="bg-screen text-screen-foreground text-fscreen text-end whitespace-nowrap overflow-x-auto rounded p-6 pt-7 tablet:p-8 tablet:pt-10 tablet:pb-9">
            <output>{calculator.display}</output>
          </p>
        </section>
        <section aria-labelledby={keypadHeadingId}>
          <h2 className="sr-only" id={keypadHeadingId}>
            Keypad
          </h2>
          <div
            className="bg-keypad rounded grid grid-cols-4 gap-3 tablet:gap-6 p-6 tablet:p-8"
            role="grid"
          >
            <Row>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(7)}>
                  <ButtonLabel>7</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(8)}>
                  <ButtonLabel>8</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(9)}>
                  <ButtonLabel>9</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button
                  className="uppercase"
                  variant="destructive"
                  onClick={() => calculator.delete()}
                >
                  <ButtonLabel>
                    <span aria-hidden="true">del</span>
                    <span className="sr-only">Delete</span>
                  </ButtonLabel>
                </Button>
              </div>
            </Row>
            <Row>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(4)}>
                  <ButtonLabel>4</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(5)}>
                  <ButtonLabel>5</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(6)}>
                  <ButtonLabel>6</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeOperator("+")}>
                  <ButtonLabel>
                    <span aria-hidden="true">+</span>
                    <span className="sr-only">Add</span>
                  </ButtonLabel>
                </Button>
              </div>
            </Row>
            <Row>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(1)}>
                  <ButtonLabel>1</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(2)}>
                  <ButtonLabel>2</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(3)}>
                  <ButtonLabel>3</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeOperator("-")}>
                  <ButtonLabel>
                    <span aria-hidden="true">-</span>
                    <span className="sr-only">Subtract</span>
                  </ButtonLabel>
                </Button>
              </div>
            </Row>
            <Row>
              <div role="gridcell">
                <Button onClick={() => calculator.typeDecimal()}>
                  <ButtonLabel>
                    <span aria-hidden="true">.</span>
                    <span className="sr-only">Decimal separator</span>
                  </ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeNumber(0)}>
                  <ButtonLabel>0</ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeOperator("/")}>
                  <ButtonLabel>
                    <span aria-hidden="true">/</span>
                    <span className="sr-only">Divide</span>
                  </ButtonLabel>
                </Button>
              </div>
              <div role="gridcell">
                <Button onClick={() => calculator.typeOperator("x")}>
                  <ButtonLabel>
                    <span aria-hidden="true">x</span>
                    <span className="sr-only">Multiply</span>
                  </ButtonLabel>
                </Button>
              </div>
            </Row>
            <Row>
              <div className="col-span-2" role="gridcell">
                <Button
                  className="uppercase"
                  variant="destructive"
                  onClick={() => calculator.reset()}
                >
                  <ButtonLabel>Reset</ButtonLabel>
                </Button>
              </div>
              <div className="col-span-2" role="gridcell">
                <Button variant="equals" onClick={() => calculator.equals()}>
                  <ButtonLabel>
                    <span aria-hidden="true">=</span>
                    <span className="sr-only">Equals</span>
                  </ButtonLabel>
                </Button>
              </div>
            </Row>
          </div>
        </section>
      </main>
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="contents" role="row">
      {children}
    </div>
  );
}

const buttonVariants = cva(
  "shadow w-full h-16 rounded-sm grid place-items-center transition-colors tablet:rounded",
  {
    variants: {
      variant: {
        default:
          "bg-key-default text-key-default-foreground shadow-key-default-shadow text-fkey hocus:bg-key-default-hocus",
        destructive:
          "bg-key-reset text-key-reset-foreground shadow-key-reset-shadow text-fkey-special hocus:bg-key-reset-hocus",
        equals:
          "bg-key-equals text-key-equals-foreground shadow-key-equals-shadow text-fkey-special hocus:bg-key-equals-hocus",
      },
    },
  }
);

interface ButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "equals";
  children: ReactNode;
  onClick(): void;
}

function Button({
  className,
  variant = "default",
  children,
  onClick,
}: ButtonProps) {
  return (
    <buttonContext.Provider value={{ variant }}>
      <button
        className={buttonVariants({ className, variant })}
        type="button"
        onClick={onClick}
      >
        {children}
      </button>
    </buttonContext.Provider>
  );
}

const buttonContext = createContext<{
  variant: "default" | "destructive" | "equals";
} | null>(null);

function useButtonContext() {
  const value = useContext(buttonContext);
  if (value === null) {
    throw new Error("useButtonContext must be used inside of a button context");
  }
  return value;
}

const buttonLabelVariants = cva("", {
  variants: {
    variant: {
      default: "translate-y-[0.125rem]",
      destructive: "tablet:translate-y-[0.0625rem]",
      equals: "tablet:translate-y-[0.0625rem]",
    },
  },
});

function ButtonLabel({ children }: { children: ReactNode }) {
  const { variant } = useButtonContext();
  return <span className={buttonLabelVariants({ variant })}>{children}</span>;
}

function Nudge({ x, children }: { x: number; children: ReactNode }) {
  return (
    <span style={{ transform: `translateX(${x / 16}rem)` }}>{children}</span>
  );
}

export default App;
