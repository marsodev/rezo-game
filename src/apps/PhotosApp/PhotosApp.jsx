import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./PhotosApp.css";
import photosData from "./data/photos.json";

const PhotosApp = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const handleNextPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex < photosData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousPhoto = () => {
    setSelectedPhotoIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleBackToGallery = () => {
    setSelectedPhotoIndex(null);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="photos-app">
      <div className="header">
        <span className="header-title">Photos</span>
      </div>
      {selectedPhotoIndex === null ? (
        <div className="gallery">
          {photosData.map((photo, index) => (
            <div
              key={index}
              className="photo-thumbnail"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img src={photo.url} alt={photo.title} />
            </div>
          ))}
        </div>
      ) : (
        <div className="photo-view">
          <button className="back-button" onClick={handleBackToGallery}>
            <FontAwesomeIcon icon={faLeftLong} />
          </button>
          <div className="location-container" onClick={toggleTooltip}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
            {showTooltip && (
              <span className="tooltip">
                {photosData[selectedPhotoIndex].location}
              </span>
            )}
          </div>

          <div className="photo-container">
            <button
              className="prev-button"
              onClick={handlePreviousPhoto}
              disabled={selectedPhotoIndex === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <img
              src={photosData[selectedPhotoIndex].url}
              alt={photosData[selectedPhotoIndex].title}
              className="photo"
            />
            <button
              className="next-button"
              onClick={handleNextPhoto}
              disabled={selectedPhotoIndex === photosData.length - 1}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
