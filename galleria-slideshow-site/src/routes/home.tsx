import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>Galleria</h1>
      <p>
        <Link to="/starry night">Starry Night</Link>
      </p>
    </>
  );
}
