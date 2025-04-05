import React, { useState } from "react";
import emailsData from "./data/emails.json";
import "./MailApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MailApp = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="mail-app">
      <div className="header">
        <span className="header-title">Mail</span>
      </div>

      {selectedEmail ? (
        <div className="mail-detail">
          <button className="back-button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="email-meta">
            <h3>{selectedEmail.subject}</h3>
            <p className="sender">{selectedEmail.sender}</p>
            <p className="date">{selectedEmail.date}</p>
          </div>
          <div className="email-body">
            <p>{selectedEmail.body}</p>
          </div>
        </div>
      ) : (
        <div className="mail-list">
          {emailsData.map((email) => (
            <div
              key={email.id}
              className="mail-preview"
              onClick={() => handleSelectEmail(email)}
            >
              <p className="subject">{email.subject}</p>
              <p className="sender">{email.sender}</p>
              <p className="body-preview">{email.body.substring(0, 50)}...</p>
              <p className="date">{email.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailApp;
