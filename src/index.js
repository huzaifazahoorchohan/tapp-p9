import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";
import "./styles/index.css";

const root = document.getElementById("root");

ReactDOMClient.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
