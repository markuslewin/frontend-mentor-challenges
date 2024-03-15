import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentRoute, {
  action as documentAction,
  loader as documentLoader,
} from "./routes/$documentId.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DocumentRoute />,
    loader: documentLoader,
    action: documentAction,
  },
  {
    path: ":documentId",
    element: <DocumentRoute />,
    loader: documentLoader,
    action: documentAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
