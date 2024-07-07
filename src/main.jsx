import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* A BrowserRouter stores the current location in the 
    browser's address bar using clean URLs and navigates using
    the browser's built-in history stack. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
