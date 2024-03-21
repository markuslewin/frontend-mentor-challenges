import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DocumentRoute, {
  action as documentAction,
  loader as documentLoader,
} from "./routes/$documentId.tsx";
import "./index.css";
import DocumentPreviewRoute from "./routes/$documentId.preview.tsx";
import DocumentIndexRoute from "./routes/$documentId.index.tsx";
import { getPreviewingHandle } from "./utils/preview.ts";

const router = createBrowserRouter([
  {
    path: ":documentId?",
    element: <DocumentRoute />,
    loader: documentLoader,
    action: documentAction,
    children: [
      { index: true, element: <DocumentIndexRoute /> },
      {
        path: "preview",
        element: <DocumentPreviewRoute />,
        handle: { ...getPreviewingHandle() },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
