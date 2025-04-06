import React, { useRef, useState } from "react";
import musicData from "./data/musics.json";
import "./MusifyApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import logoMusic from "../../assets/img/music-logo.png";

const MusifyApp = () => {
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const audioRefs = useRef({});
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    Object.values(audioRefs.current).forEach((audio) => {
      if (audio) audio.volume = newVolume;
    });
  };

  const handlePlayPause = (id) => {
    const audio = audioRefs.current[id];

    if (!audio) return;

    if (currentTrackId === id && !audio.paused) {
      audio.pause();
      setCurrentTrackId(null);
    } else {
      // Pause any other playing audio
      Object.entries(audioRefs.current).forEach(([key, ref]) => {
        if (ref && !ref.paused) {
          ref.pause();
        }
      });

      audio.play();
      setCurrentTrackId(id);
    }
  };

  return (
    <div className="musify-app">
      <div className="header">
        <span className="header-title">
          <img src={logoMusic} alt="logo Musify" />
        </span>
        <div className="volume-control">
          <label>
            🔊
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </label>
        </div>
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

            <button
              className="play-button"
              onClick={() => handlePlayPause(track.id)}
            >
              <FontAwesomeIcon
                icon={currentTrackId === track.id ? faPause : faPlay}
              />
            </button>

            <audio
              ref={(el) => (audioRefs.current[track.id] = el)}
              src={track.audio}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusifyApp;
