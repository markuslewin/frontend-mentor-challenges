export default function Home() {
  return (
    <>
      <header>
        <h1>
          <img alt="Tic-tac-toe" src="/assets/logo.svg" />
        </h1>
      </header>
      <main>
        <form>
          <fieldset aria-describedby="player-1-reminder">
            <legend>Pick player 1's mark</legend>
            <label>
              <input type="radio" name="player-1" value="X" />{" "}
              <img alt="X" src="/assets/icon-x.svg" />
            </label>
            <label>
              <input type="radio" name="player-1" value="O" />{" "}
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
      {/*

   <!-- Game board start -->

   <!-- x/o icon --> turn

   X (You) <!-- Your score -->
   Ties <!-- Ties score -->
   X (CPU) <!-- CPU score -->

   Oh no, you lost
   You won!
   Player <!-- 1/2 --> wins!

   <!-- x/o icon --> takes the round
   Round tied
   Restart game?

   Quit
   Next round
   No, cancel
   Yes, restart

   <!-- Game board end -->
   */}
    </>
  );
}
