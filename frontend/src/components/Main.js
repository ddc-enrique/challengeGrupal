import "../styles/CardCity.css"; //css contiene main y cardCity
import React from "react";
import CardCity from "./CardCity";
import { connect } from "react-redux";
import { useEffect } from "react";

import citiesActions from "../redux/action/citiesActions";
const Main = (props) => {
  useEffect(async () => {
    try {
      let res = await props.allCities();
      if(!res.data.success) throw res.data.response;
      if(!res.data.response.length) throw res.data.response;
    } catch (err) {
      console.log(err);
    }
  }, []);
  const city = props.cities.map((city) => (
    <CardCity key={city._id} city={city} />
  ));
  return (
    <main>
      <h1 className="mainTitle">Buscá en alguna de estas localidades</h1>
      {city}
    </main>
  );
};
const mapDispatchToProps = {
  allCities: citiesActions.getCities,
};

const mapStateToProps = (state) => {
  return {
    cities: state.allCities.cities,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);