import React from "react";
import Header from "./Header";

const Hero = () => {
  return (
    <div
      className="containerHero"
      style={{ backgroundImage: `url("/assets/backGround375.jpg")` }}
    >
      <Header />
    </div>
  );
};

export default Hero;
