import "../styles/CardCity.css"; //css contiene main y cardCity
import React from "react";
import { Link } from "react-router-dom";
const CardCity = (props) => {
  const { cityName, photoURL } = props.city;
  return (
    <div className="divCard">
      <Link to="/city">
        <div
          className="cardCity"
          style={{ backgroundImage: `url(${photoURL})` }}
        >
          <h1>{cityName}</h1>
          <p>(12155 propiedades)</p>
        </div>
      </Link>
    </div>
  );
};

export default CardCity;
