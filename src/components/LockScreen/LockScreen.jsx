import React, { useState } from "react";
import "./LockScreen.css";

const LockScreen = ({ onUnlock }) => {
  const [pin, setPin] = useState("");
  const [showPinPad, setShowPinPad] = useState(false);
  const [isScreenClicked, setIsScreenClicked] = useState(false);
  const [error, setError] = useState("");

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
      onUnlock();
      setPin("");
      setError("");
    } else {
      setError("Code PIN incorrect !");
      setPin("");
    }
  };

  if (pin.length === 4) {
    checkPin();
  }

  return (
    <div className="locked-screen" onClick={handleScreenClick}>
      {!isScreenClicked && (
        <>
          <p className="locked-icon">🔒</p>
          <p className="unlock-info">Appuyez sur l'écran pour déverrouiller</p>
        </>
      )}

      {showPinPad && (
        <div>
          {pin.length > 0 && (
            <div className="pin-input">
              <p>Code PIN: {pin}</p>
            </div>
          )}
          {error && <div className="error-message">{error}</div>}{" "}
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
