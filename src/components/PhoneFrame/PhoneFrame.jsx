import React, { useState, useEffect } from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children, onHomePress }) => {
  const [time, setTime] = useState(new Date()); // Initialise avec l'heure actuelle

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // Met à jour l'heure à chaque seconde
    }, 1000); // Mise à jour chaque seconde

    return () => clearInterval(interval); // Nettoyage lors du démontage du composant
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Format 24h
    });
  };

  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        {/* Barre de statut */}
        <div className="status-bar">
          <span className="time">{formatTime(time)}</span>
          <span className="battery">🔋 80%</span>
        </div>

        <div className="notch"></div>
        <div className="screen">{children}</div>
        <div className="home-indicator" onClick={onHomePress}></div>
      </div>
    </div>
  );
};

export default PhoneFrame;
