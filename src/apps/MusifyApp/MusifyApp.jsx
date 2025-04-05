import React from "react";
import musicData from "./data/musics.json";
import "./MusifyApp.css";

const MusifyApp = () => {
  return (
    <div className="musify-app">
      <div className="header">
        <span className="header-title">Musify</span>
      </div>
      <div className="music-list">
        {musicData.map((track) => (
          <div key={track.id} className="music-card">
            <img src={track.cover} alt={track.title} className="cover-img" />
            <div className="music-info">
              <h3 className="title">{track.title}</h3>
              <p className="duration">⏱ {track.duration}</p>
              <p className="plays">👂 {track.plays.toLocaleString()} écoutes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusifyApp;
