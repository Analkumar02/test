import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/globalStyles";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import CheckOut from "./pages/CheckOut";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
