import React from "react";
import "./HomeScreen.css";
import appIcon from "../../assets/img/app-icon.png";

const HomeScreen = ({ openApp }) => {
  return (
    <div className="home-screen">
      <div className="app-icon" onClick={openApp}>
        <img src={appIcon} alt="App Icon" />
        <p>Rezo</p>
      </div>
    </div>
  );
};

export default HomeScreen;
