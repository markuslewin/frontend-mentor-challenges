import Icon from "../components/icon";

export default function Home() {
  return (
    <>
      <header>
        <h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Tic-tac-toe" src="/assets/logo.svg" />
        </h1>
      </header>
      <main>
        <form>
          <fieldset aria-describedby="player-1-reminder">
            <legend>Pick player 1&apos;s mark</legend>
            <label>
              <input type="radio" name="player-1" value="X" />
              <span> X</span>
              <Icon className="text-red-700" name="icon-x" />
            </label>
            <label>
              <input type="radio" name="player-1" value="O" />{" "}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="O" src="/assets/icon-o.svg" />
            </label>
            <p id="player-1-reminder">Remember: X goes first</p>
          </fieldset>
          <button type="submit" name="opponent" value="cpu">
            New Game (vs CPU)
          </button>
          <button type="submit" name="opponent" value="player">
            New Game (vs player)
          </button>
        </form>
      </main>

      {/* <header>
        <h1>
          <img alt="Tic-tac-toe" src="/assets/logo.svg" />
        </h1>
        <p>
          <img alt="X's" src="/assets/icon-x.svg" /> turn
        </p>
        <button type="button">
          <img alt="Restart game" src="/assets/icon-restart.svg" />
        </button>
      </header>
      <main>
        <h2>Game</h2>
        https://react-spectrum.adobe.com/react-aria/Table.html
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
      <footer>
        <h2>Points</h2>
        <ul>
          <li>X (You): 0</li>
        </ul>
        <ul>
          <li>Ties: 0</li>
        </ul>
        <ul>
          <li>O (CPU): 0</li>
        </ul>
      </footer>

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
    </>
  );
}
