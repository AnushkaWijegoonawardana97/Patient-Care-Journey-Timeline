import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

const rootElement = document.querySelector<HTMLDivElement>("#app");

if (!rootElement) {
  throw new Error("Root element not found");
}

// #region agent log
const styleSheets = Array.from(document.styleSheets);
const cssRulesCount = styleSheets.reduce((acc, sheet) => {
  try {
    return acc + (sheet.cssRules?.length || 0);
  } catch {
    return acc;
  }
}, 0);
fetch("http://127.0.0.1:7242/ingest/5b3ac9d4-f4f9-471a-988b-3d625e5a01cf", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    location: "main.tsx:15",
    message: "CSS loaded check",
    data: { styleSheetsCount: styleSheets.length, cssRulesCount },
    timestamp: Date.now(),
    sessionId: "debug-session",
    runId: "run1",
    hypothesisId: "A",
  }),
}).catch(() => {});
// #endregion

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
