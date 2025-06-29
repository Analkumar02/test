import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ImagePathProvider } from "./context/ImagePathContext";
import "./index.css";

// Global scroll-to-top on route/page load
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ImagePathProvider basePath={`${process.env.PUBLIC_URL}/assets/images/`}>
    <>
      <ScrollToTop />
      <App />
    </>
  </ImagePathProvider>
);
