import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImagePathProvider } from "./context/ImagePathContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ImagePathProvider basePath={`${process.env.PUBLIC_URL}/assets/images/`}>
      <App />
    </ImagePathProvider>
  </React.StrictMode>
);
