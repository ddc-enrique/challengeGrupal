import React from "react";
import BigFilter from "./BigFilter";
import Header from "./Header";
import HomeFilter from "./HomeFilter";

const Hero = () => {
  return (
    <div
      className="containerHero"
      style={{ backgroundImage: `url("/assets/backGround375.jpg")` }}
    >
      <Header />
      {/* <HomeFilter /> */}
      <BigFilter />
    </div>
  );
};

export default Hero;
