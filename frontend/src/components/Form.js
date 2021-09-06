import "../styles/Form.css";
import React from "react";

const Form = () => {
  // firstName lastName password eMail photoURL
  return (
    <div className="formSignUp">
      <form>
        <h1>Registrate</h1>
        <div>
          <input type="text" name="firstName" placeholder="Nombre"></input>
        </div>
        <div>
          <input type="text" name="lastName" placeholder="Apellido"></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
          ></input>
        </div>
        <div>
          <input type="email" name="eMail" placeholder="Email"></input>
        </div>
        <div>
          <input type="text" name="photoURL" placeholder="url de foto"></input>
        </div>
      </form>
    </div>
  );
};

export default Form;
