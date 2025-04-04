import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/img/logo-full.png";

const Navbar = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetClick = () => {
    setShowConfirm(true);
  };

  const handleResetConfirm = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleResetCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <a href="#" className="navbar-link">
        Comment jouer ?
      </a>
      <button className="reset-button" onClick={handleResetClick}>
        Réinitialiser
      </button>

      {showConfirm && (
        <div className="confirmation-popup">
          <div className="popup-content">
            <p>
              Êtes-vous sûr de vouloir réinitialiser le jeu ? Cette action
              supprimera toutes les données.
            </p>
            <button onClick={handleResetConfirm} className="popup-confirm">
              Oui
            </button>
            <button onClick={handleResetCancel} className="popup-cancel">
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
