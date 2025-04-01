import React, { useState } from "react";
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";
import LockScreen from "./components/LockScreen/LockScreen";
import "./styles/App.css";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <PhoneFrame>
      {isUnlocked ? (
        <div className="unlocked-screen">
          <p>🔓</p>
        </div>
      ) : (
        <LockScreen onUnlock={handleUnlock} />
      )}
    </PhoneFrame>
  );
};

export default App;
