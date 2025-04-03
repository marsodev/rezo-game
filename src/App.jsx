import React, { useState } from "react";
import PhoneFrame from "./components/PhoneFrame/PhoneFrame";
import LockScreen from "./components/LockScreen/LockScreen";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import RezoApp from "./apps/RezoApp/RezoApp";
import PhotosApp from "./apps/PhotosApp/PhotosApp";
import Navbar from "./components/Navbar/Navbar";
import "./styles/App.css";
import appIcon from "./assets/img/app-icon.png";
import photosIcon from "./assets/img/app-icon-2.png";

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [appOpened, setAppOpened] = useState(null);

  const apps = [
    { name: "Rezo", icon: appIcon },
    { name: "Photos", icon: photosIcon },
  ];

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleHomePress = () => {
    if (!appOpened) {
      setIsUnlocked(false);
    } else {
      setAppOpened(null);
    }
  };

  const handleAppOpen = (appName) => {
    setAppOpened(appName);
  };

  const isHomeScreen = isUnlocked && !appOpened;

  return (
    <>
      <Navbar />
      <PhoneFrame onHomePress={handleHomePress} isHomeScreen={isHomeScreen}>
        {isUnlocked ? (
          appOpened ? (
            appOpened === "Rezo" ? (
              <RezoApp />
            ) : appOpened === "Photos" ? (
              <PhotosApp />
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
    </>
  );
};

export default App;
