import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentRoute, {
  loader as documentLoader,
} from "./routes/$document.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DocumentRoute />,
    loader: documentLoader,
  },
  {
    path: ":document",
    element: <DocumentRoute />,
    loader: documentLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
