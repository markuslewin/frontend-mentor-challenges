import logo from "@/app/logo.svg";
import Image from "next/image";
import Icon from "../../components/icon";

export default function Play() {
  return (
    <div className="min-h-screen grid grid-cols-[minmax(0,28.75rem)] grid-rows-[1fr_auto_1fr] justify-center items-start tablet:grid-rows-none tablet:place-content-center p-6">
      <header className="grid grid-cols-3 gap-5 items-center">
        <h1>
          <Image className="w-[4.5rem]" alt="Tic-tac-toe" src={logo} />
        </h1>
        <div className="bg-semi-dark-navy text-silver font-bold tablet:text-heading-xs p-[0.5625rem] pb-[0.8125rem] tablet:p-[0.8125rem] tablet:pb-[1.1875rem] shadow-inner-small shadow-[hsl(201_45%_11%)] rounded-[0.625rem] grid justify-center">
          <p className="grid grid-cols-[max-content_1fr] gap-2 tablet:gap-3 items-center">
            <Icon className="size-4 tablet:size-5" name="x" />
            <span className="sr-only">X&apos;s </span> turn
          </p>
        </div>
        <button
          className="justify-self-end bg-silver text-semi-dark-navy size-10 tablet:size-[3.25rem] rounded-[0.3125rem] tablet:rounded-[0.625rem] grid place-items-center shadow-inner-small shadow-[hsl(198_17%_50%)] hocus:bg-silver-hover transition-colors"
          type="button"
        >
          <Icon className="size-4 tablet:size-5" name="restart" />
          <span className="sr-only"> Restart game</span>
        </button>
      </header>
      <div>
        <main className="mt-5">
          <h2 className="sr-only">Game</h2>
          {/* https://react-spectrum.adobe.com/react-aria/Table.html */}
          <table>
            <thead>
              <tr>
                <th scope="col">Row</th>
                <th scope="col">A</th>
                <th scope="col">B</th>
                <th scope="col">C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">3</th>
                <td>
                  <button type="button">Choose 3A</button>
                </td>
                <td>
                  <button type="button">Choose 3B</button>
                </td>
                <td>
                  <button type="button">Choose 3C</button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>
                  <button type="button">Choose 2A</button>
                </td>
                <td>
                  <button type="button">Choose 2B</button>
                </td>
                <td>
                  <button type="button">Choose 2C</button>
                </td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>
                  <button type="button">Choose 1A</button>
                </td>
                <td>
                  <button type="button">Choose 1B</button>
                </td>
                <td>
                  <button type="button">Choose 1C</button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
        <footer className="mt-5">
          <h2 className="sr-only">Points</h2>
          <ul className="grid grid-cols-3 gap-5 text-center text-[0.75rem] leading-[0.9375rem] tracking-[0.046875rem] font-medium tablet:text-body">
            <li className="bg-light-blue text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              X (You):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
            <li className="bg-silver text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              Ties:{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
            <li className="bg-light-yellow text-dark-navy rounded-[0.625rem] tablet:rounded-[0.9375rem] p-3 grid">
              O (CPU):{" "}
              <strong className="text-heading-s tablet:text-heading-m">
                0
              </strong>
            </li>
          </ul>
        </footer>
        {/*

      https://www.radix-ui.com/primitives/docs/components/alert-dialog
      <div>
        <h2>Oh no, you lost</h2>
        <h2>You won!</h2>
        <h2>Round tied</h2>
        <h2>Player 1/2 wins!</h2>
        <p>Oh no, you lost</p>
        <p>You won!</p>
        <p>x/o icon takes the round</p>
        <ul>
          <li>
            <button type="button">Quit</button>
          </li>
          <li>
            <button type="button">Next round</button>
          </li>
        </ul>
      </div>

      https://www.radix-ui.com/primitives/docs/components/dialog
      <div>
        <h2>Restart game?</h2>
        <ul>
          <li>
            <button type="button">No, cancel</button>
          </li>
          <li>
            <button type="button">Yes, restart</button>
          </li>
        </ul>
      </div> */}
      </div>
    </div>
  );
}
