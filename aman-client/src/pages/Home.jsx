import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
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
      <Categories />
      <Products/>
      <Footer/>
      <Map/>
      </HomeContainer>
  );
};

export default Home;
