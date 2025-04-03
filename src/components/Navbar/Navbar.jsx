import React from "react";
import "./Navbar.css";
import logo from "../../assets/img/logo-full.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <a href="#" className="navbar-link">
        Comment jouer ?
      </a>
    </div>
  );
};

export default Navbar;
