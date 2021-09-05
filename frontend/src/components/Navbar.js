import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-xxl ">
        <div className="container-fluid">
          <button
            className="logoUser"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img
              classNameName="navbar-toggler-icon  user2"
              src="/assets/logo.png"
              alt="logo-user"
            /> 
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="#" className="nav-link active" aria-current="page" href="#">
                  Perfil
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="#" className="nav-link" href="#">
                Favoritas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="#" className="nav-link" href="#">
                Alertas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="#" className="nav-link" href="#">
                Cerrar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
