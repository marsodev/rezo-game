import React, { useState } from "react";
import "./PhotosApp.css";
import photosData from "./data/photos.json"; // Les images à afficher, par exemple un tableau d'URLs

const PhotosApp = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

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
    setSelectedPhotoIndex(null); // Retour à la galerie de photos
  };

  return (
    <div className="photos-app">
      <div className="header">
        <span className="app-version">v1.0</span>
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
            Retour
          </button>
          <div className="photo-container">
            <button className="prev-button" onClick={handlePreviousPhoto}>
              &#8592;
            </button>
            <img
              src={photosData[selectedPhotoIndex].url}
              alt={photosData[selectedPhotoIndex].title}
              className="photo"
            />
            <button className="next-button" onClick={handleNextPhoto}>
              &#8594;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosApp;
