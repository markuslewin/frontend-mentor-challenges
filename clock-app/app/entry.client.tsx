import React from "react";
import ReactDOM from "react-dom/client";
import App from "#app/root";
import "#app/index.css";

async function enableMocking() {
  if (import.meta.env.DEV && import.meta.env.VITE_MOCKS === "true") {
    const { worker } = await import("#app/mocks");

    return worker.start();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
