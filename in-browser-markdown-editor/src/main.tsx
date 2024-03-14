import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IndexRoute, { loader as indexLoader } from "./routes/index.tsx";
import DocumentRoute, {
  loader as documentLoader,
} from "./routes/$document.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexRoute />,
    loader: indexLoader,
  },
  {
    path: "/:document",
    element: <DocumentRoute />,
    loader: documentLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
