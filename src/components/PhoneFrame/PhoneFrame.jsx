import React, { useState, useEffect } from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children, onHomePress, isHomeScreen }) => {
  const [time, setTime] = useState(new Date());
  const [isShaking, setIsShaking] = useState(false);
  const [prevIsHomeScreen, setPrevIsHomeScreen] = useState(null);

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
    if (prevIsHomeScreen !== null && isHomeScreen && prevIsHomeScreen) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
    setPrevIsHomeScreen(isHomeScreen);
  }, [isHomeScreen]);

  return (
    <div className={`phone-frame-container ${isShaking ? "shake" : ""}`}>
      <div className="phone-frame">
        <div className="status-bar">
          <span className="time">{formatTime(time)}</span>
          <div className="status-right">
            <div className="network-signal">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
              <div className="bar bar-4 empty"></div>{" "}
            </div>
            <div className="battery-visual">
              <div className="battery-level" style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>
        <div className="notch"></div>
        <div className="screen">{children}</div>
        <div className="home-indicator" onClick={onHomePress}></div>
      </div>
    </div>
  );
};

export default PhoneFrame;
