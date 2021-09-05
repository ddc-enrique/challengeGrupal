import "../styles/Home.css"
import React from "react";
import Footer from "../components/Footer";
import HeroHome from "../components/HeroHome";

const Home = () => {
  return (
    <div className="containerHome">
      <HeroHome />
      <Footer />
    </div>
  );
};

export default Home;
