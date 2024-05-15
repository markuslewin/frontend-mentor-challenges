import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>calc</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </>
  );
}

export default App;
