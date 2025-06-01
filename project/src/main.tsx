import React from "react";
import { createRoot } from "react-dom/client";
import { AuthSocketWrapper } from "./providers/AuthSocketWrapper";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthSocketWrapper>
      <App />
    </AuthSocketWrapper>
  </React.StrictMode>
);
