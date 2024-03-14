import { useLoaderData } from "react-router-dom";
import App from "../App";
import documents from "../data/data.json";

export async function loader() {
  return { doc: documents[1] };
}

export default function IndexRoute() {
  const { doc } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return <App doc={doc} />;
}
