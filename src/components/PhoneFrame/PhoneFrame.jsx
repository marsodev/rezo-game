import React, { useState, useEffect } from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children, onHomePress, isHomeScreen }) => {
  const [time, setTime] = useState(new Date());
  const [isShaking, setIsShaking] = useState(false);
  const [prevIsHomeScreen, setPrevIsHomeScreen] = useState(isHomeScreen);

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
    if (isHomeScreen && prevIsHomeScreen) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    setPrevIsHomeScreen(isHomeScreen);
  }, [isHomeScreen]);

  const handleHomeIndicatorClick = () => {
    onHomePress();
  };

  return (
    <div className={`phone-frame-container ${isShaking ? "shake" : ""}`}>
      <div className="phone-frame">
        <div className="status-bar">
          <span className="time">{formatTime(time)}</span>
          <span className="battery">🔋 80%</span>
        </div>
        <div className="notch"></div>
        <div className="screen">{children}</div>
        <div
          className="home-indicator"
          onClick={handleHomeIndicatorClick}
        ></div>
      </div>
    </div>
  );
};

export default PhoneFrame;
