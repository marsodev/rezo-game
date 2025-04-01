import React from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children }) => {
  return (
    <div className="phone-frame-container">
      <div className="phone-frame">
        <div className="notch"></div>
        <div className="screen">{children}</div>
      </div>
    </div>
  );
};

export default PhoneFrame;
