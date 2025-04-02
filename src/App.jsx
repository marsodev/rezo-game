import React, { useState } from "react";
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";
import LockScreen from "./components/LockScreen/LockScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import RezoApp from "./apps/RezoApp/RezoApp";
import "./styles/App.css";
import appIcon from "./assets/img/app-icon.png";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [appOpened, setAppOpened] = useState(null);

  const apps = [{ name: "Rezo", icon: appIcon }];

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleHomePress = () => {
    setAppOpened(null);
  };

  const handleAppOpen = (appName) => {
    setAppOpened(appName);
  };

  return (
    <PhoneFrame onHomePress={handleHomePress}>
      {isUnlocked ? (
        appOpened ? (
          appOpened === "Rezo" ? (
            <RezoApp />
          ) : (
            <div className="app-screen">
              <p>🎮 Application {appOpened} en cours de développement...</p>
            </div>
          )
        ) : (
          <HomeScreen apps={apps} openApp={handleAppOpen} />
        )
      ) : (
        <LockScreen onUnlock={handleUnlock} />
      )}
    </PhoneFrame>
  );
};

export default App;
