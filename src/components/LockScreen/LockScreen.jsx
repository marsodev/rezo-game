import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "./LockScreen.css";

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [showPinPad, setShowPinPad] = useState(false);
  const [isScreenClicked, setIsScreenClicked] = useState(false);
  const [isPinIncorrect, setIsPinIncorrect] = useState(false);

  const handleScreenClick = () => {
    setShowPinPad(true);
    setIsScreenClicked(true);
  };

  const handlePinInput = (number) => {
    if (pin.length < 4) {
      setPin(pin + number);
    }
  };

  const checkPin = () => {
    if (pin === "1234") {
      setIsPinIncorrect(false);
      onUnlock();
      setPin("");
    } else {
      setIsPinIncorrect(true);
      setTimeout(() => {
        setIsPinIncorrect(false);
        setPin("");
      }, 500);
    }
  };

  if (pin.length === 4) {
    setTimeout(checkPin, 300);
  }

  return (
    <div
      className={`locked-screen ${isPinIncorrect ? "shake" : ""}`}
      onClick={handleScreenClick}
    >
      {!isScreenClicked && (
        <>
          <FontAwesomeIcon icon={faLock} className="locked-icon" />
          <p className="unlock-info">Appuyez sur l'écran pour déverrouiller</p>
        </>
      )}

      {showPinPad && (
        <div className="pin-container">
          <div className="pin-display">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`pin-box ${pin[index] ? "filled" : ""}`}
              >
                {pin[index] || ""}
              </div>
            ))}
          </div>

          <div className="pin-keypad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button key={num} onClick={() => handlePinInput(num)}>
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LockScreen;
