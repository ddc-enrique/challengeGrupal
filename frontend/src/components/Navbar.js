import "../styles/NavBar.css"
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [change, setChange] = useState(false);
  const nav = [
    { name: "Registrarse", ruta: "/logOut" },
    { name: "Ingresar", ruta: "/logIn" },
  ];
  var navMap = nav.map((a, index) => (
    <Link key={index} to={a.ruta}>
      <div className="links">{a.name}</div>
    </Link>
  ));

  const runButton = () => {
    setChange(!change);
  };

  return (
    <div className="navBar">
      <button onClick={runButton}>
        <img
          className="logoUser"
          src="/assets/logo.png"
          alt="logo-user"
          width="50px"
          height="50px"
        />
      </button>
      {change && (
        <>
          <nav className="userMenu">{navMap}</nav>
          <div className="closeDiv" onClick={() => setChange(false)}></div>
          <div className="closeDiv1" onClick={() => setChange(false)}></div>
        </>
      )}
    </div>
  );
};

export default NavBar;
