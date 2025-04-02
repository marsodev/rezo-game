import React from "react";
import "./HomeScreen.css";

const HomeScreen = ({ apps, openApp }) => {
  return (
    <div className="home-screen">
      {apps.map((app, index) => (
        <div className="app-icon" onClick={() => openApp(app.name)} key={index}>
          <img src={app.icon} alt={app.name} />
          <p>{app.name}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeScreen;
