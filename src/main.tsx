import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import "./lib/i18n"; // Initialize i18n before rendering
import App from "./App";

const rootElement = document.querySelector<HTMLDivElement>("#app");

if (!rootElement) {
  throw new Error("Root element not found");
}

/** Initialize MSW for demo purposes (enabled in all environments) */
async function enableMocking(): Promise<void> {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

/** Render the application after MSW is ready */
enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
