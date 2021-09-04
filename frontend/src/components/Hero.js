import React from "react";
import Header from "./Header";
import HomeFilter from "./HomeFilter";

const Hero = () => {
  return (
    <div
      className="containerHero"
      style={{ backgroundImage: `url("/assets/backGround375.jpg")` }}
    >
      <Header />
      <HomeFilter />
    </div>
  );
};

export default Hero;
