import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ResetStyle } from "./styles/ResetStyle";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ResetStyle />
    <App />
  </React.StrictMode>
);
