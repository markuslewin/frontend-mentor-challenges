import React from "react";
import ReactDOM from "react-dom/client";
import App from "#app/root";
import "#app/index.css";

if (import.meta.env.VITE_MOCKS === "true") {
  await import("#app/mocks");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
