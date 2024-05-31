import { useId, useRef } from "react";
import { useCalculator } from "./utils/calculator/use-calculator";
import { useTheme } from "./utils/theme";
import { Button, ButtonLabel } from "./components/button";
import { Cell, Grid, Row } from "./components/grid";
import { Nudge } from "./components/nudge";

function App() {
  const screenHeadingId = useId();
  const keypadHeadingId = useId();
  const { theme, setTheme } = useTheme();
  const calculator = useCalculator();
  const buttonsRef = useRef<(HTMLButtonElement | null)[][]>([
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null],
  ]);

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
                checked={theme === "1"}
                onChange={() => setTheme("1")}
              />
              <Nudge x={1}>1</Nudge>
            </label>
            <label className="toggle__two">
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value="2"
                checked={theme === "2"}
                onChange={() => setTheme("2")}
              />
              <Nudge x={1}>2</Nudge>
            </label>
            <label className="toggle__three">
              <input
                className="sr-only"
                type="radio"
                name="theme"
                value="3"
                checked={theme === "3"}
                onChange={() => setTheme("3")}
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
            <output aria-labelledby={screenHeadingId}>
              {calculator.display}
            </output>
          </p>
        </section>
        <section aria-labelledby={keypadHeadingId}>
          <h2 className="sr-only" id={keypadHeadingId}>
            Keypad
          </h2>
          <Grid
            onKeyDown={(e) => {
              const buttons = buttonsRef.current;

              function getFocusPosition() {
                for (let y = 0; y < buttons.length; ++y) {
                  for (let x = 0; x < buttons[y].length; ++x) {
                    if (buttons[y][x] === document.activeElement) {
                      return { y, x };
                    }
                  }
                }
                return null;
              }

              const position = getFocusPosition();

              if (position === null) return;

              if (e.key === "ArrowUp") {
                buttons[Math.max(0, position.y - 1)][position.x]?.focus();
              } else if (e.key === "ArrowRight") {
                buttons[position.y][
                  Math.min(buttons[position.y].length - 1, position.x + 1)
                ]?.focus();
              } else if (e.key === "ArrowDown") {
                buttons[Math.min(buttons.length - 1, position.y + 1)][
                  position.x
                ]?.focus();
              } else if (e.key === "ArrowLeft") {
                buttons[position.y][Math.max(0, position.x - 1)]?.focus();
              }
            }}
          >
            {calculator.buttons.map((row, y) => (
              <Row key={y}>
                {row.map((btn, x) => (
                  <Cell
                    key={x}
                    span={btn.span === undefined ? undefined : btn.span}
                  >
                    <Button
                      ref={(el) => {
                        buttonsRef.current[y][x] = el;
                      }}
                      variant={btn.variant}
                      textTransform={btn.textTransform}
                      onClick={btn.onClick}
                    >
                      {btn.name === undefined ? (
                        <ButtonLabel>{btn.label}</ButtonLabel>
                      ) : (
                        <ButtonLabel>
                          <span aria-hidden="true">{btn.label}</span>
                          <span className="sr-only">{btn.name}</span>
                        </ButtonLabel>
                      )}
                    </Button>
                  </Cell>
                ))}
              </Row>
            ))}
          </Grid>
        </section>
      </main>
    </div>
  );
}

export default App;
