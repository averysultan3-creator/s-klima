import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ContactPopup from "./ContactPopup.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ContactPopup />
  </React.StrictMode>,
);
