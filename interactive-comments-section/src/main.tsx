import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Supports weights 300-900
import "@fontsource-variable/rubik";
import { CommentsProvider } from "./utils/comments.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CommentsProvider>
      <App />
    </CommentsProvider>
  </React.StrictMode>
);
