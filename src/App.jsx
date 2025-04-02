import React, { useState } from "react";
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";
import LockScreen from "./components/LockScreen/LockScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import "./styles/App.css";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [appOpened, setAppOpened] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleHomePress = () => {
    setAppOpened(false); // Ferme l'app et revient à l'accueil
  };

  return (
    <PhoneFrame onHomePress={handleHomePress}>
      {isUnlocked ? (
        appOpened ? (
          <div className="app-screen">
            <p>🎮 Application en cours de développement...</p>
          </div>
        ) : (
          <HomeScreen openApp={() => setAppOpened(true)} />
        )
      ) : (
        <LockScreen onUnlock={handleUnlock} />
      )}
    </PhoneFrame>
  );
};

export default App;
