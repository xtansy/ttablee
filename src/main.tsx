import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./shared/styles/base.css";
import { CursorEffect, Particles } from "./shared/index.ts";

createRoot(document.getElementById("root")!).render(
  <div style={{ position: "relative", zIndex: 0 }}>
    <App />
    <Particles />
    <CursorEffect />
  </div>
);
