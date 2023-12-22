import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import AboutUs from "../components/AboutUs";
import Map from "../components/Map";
import styled from "styled-components";


const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

const Home = ({themeToggler, theme}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <HomeContainer>
      <Navbar themeToggler={themeToggler} theme={theme}  />
      <Slider />
      <AboutUs/>
      <Products/>
      <Footer/>
      <Map/>
      </HomeContainer>
  );
};

export default Home;
