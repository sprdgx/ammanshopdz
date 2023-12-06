import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./style/themes";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";

const App = () => {
  const StyledApp = styled.div`
    color: ${(props) => props.theme.fontColor};
  `;

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <Router>
          <Routes>
            <Route
              path="/products/:category"
              element={<ProductList themeToggler={themeToggler} theme={theme} />}
            />
            <Route
              path="/cart"
              element={<Cart themeToggler={themeToggler} theme={theme} />}
            />
            <Route
              path="/product/:id"
              element={<Product themeToggler={themeToggler} theme={theme} />}
            />
            <Route
              exact
              path="/"
              element={<Home themeToggler={themeToggler} theme={theme} />}
            />
          </Routes>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
