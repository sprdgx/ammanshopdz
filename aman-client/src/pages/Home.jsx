import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";



const Home = ({themeToggler, theme}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <div>
      <Navbar themeToggler={themeToggler} theme={theme}  />
      <Announcement />
      <Slider />
      <Categories />
      <Products/>
      <Footer/>
      </div>
  );
};

export default Home;
