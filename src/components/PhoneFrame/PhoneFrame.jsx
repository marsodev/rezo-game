import React, { useState, useEffect } from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children, onHomePress, isError }) => {
  const [time, setTime] = useState(new Date());
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    if (isError) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500); // Arrête l'effet après 500ms
    }
  }, [isError]);

  return (
    <div className={`phone-frame-container ${isShaking ? "shake" : ""}`}>
      <div className="phone-frame">
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
