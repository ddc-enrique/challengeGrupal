import "../styles/NavBar.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import userActions from "../redux/action/userActions";


const NavBar = ({token, logOut}) => {
  const [navOpen, setNavOpen] = useState(false);

  const showWishList = () => {
    
  }

  const nav = !token ? [  { name: "Ingresar", route: "/iniciar-sesion", action: null },
                        { name: "Registrarse", route: "/registrarse", action: null },]
                      : [ { name:"Cerrar Sesión", route: "#", action: logOut }, 
                          { name:"Favoritos", route:"#", action: showWishList }]

  var navMap = nav.map((a, index) => (
    <Link key={index} to={a.route} onClick={a.action}>
      {a.name}
    </Link>
  ));

  return (
    <div className="navBar">
      <button onClick={() => setNavOpen(!navOpen)}>
        <img
          className="logoUser"
          src="/assets/logo.png"
          alt="logo-user"
          width="50px"
          height="50px"
        />
      </button>
      {navOpen && (
        <>
          <nav className="userMenu">{navMap}</nav>
          <div className="closeDiv1" 
            onClick={() => setNavOpen(false)}>
          </div>
          <div className="closeDiv2" 
            onClick={() => setNavOpen(false)}>
          </div>
        </>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  logOut: userActions.logOut,
}

const mapStateToProps = (state) =>{
  return {
    token: state.user.token,
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
