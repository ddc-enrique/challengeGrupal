import "../styles/CardCity2.css"; //css contiene main y cardCity
import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import propertiesActions from "../redux/action/propertiesActions";

const CardCity = (props) => {
  const [numberProperties, setNumberPropierties] = useState();
  const { cityName, photoURL, _id } = props.city;
  useEffect(() => {
    const numberProperties = async () => {
      try {
        var res = await props.getNumberOfProperties(_id);
        if (!res.success) {
          throw res.data.response;
        } else {
          setNumberPropierties(res.response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    numberProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchInPropertiesList = async () => {
    try {
      let res = await props.getPropertiesFiltered({ city: _id });
      console.log(
        "array de propiedades en home despues de hacer primera busqueda"
      );
      console.log(res.data.response);
      if (!res.data.success) {
        throw res.data.response;
      } else {
        props.history.push("/lista-de-propiedades");
      }
      if (!res.data.response) throw res.data.response;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="divCard">
      <div onClick={searchInPropertiesList}>
        <div
          className="cardCity"
          style={{ backgroundImage: `url(${photoURL})` }}
        >
          <h1>{cityName}</h1>
          <p>({numberProperties} propiedades)</p>
        </div>
        {/* <div>
          <h1>{cityName}</h1>
          <p>({numberProperties} propiedades)</p>
        </div> */}
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  getNumberOfProperties: propertiesActions.getNumberOfProperties,
  getPropertiesFiltered: propertiesActions.getPropertiesFiltered,
};

export default connect(null, mapDispatchToProps)(CardCity);
