import React, { useState, useEffect, useRef } from "react";
import "./RezoApp.css";
import messagesData from "./data/messages.json";
import fakeProfile from "../../assets/img/fake-profile.png";

const RezoApp = () => {
  const [messages, setMessages] = useState([]);
  const [responseOptions, setResponseOptions] = useState([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false); // État pour bloquer les réponses
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([messagesData[0]]);
    setResponseOptions(messagesData[0].responses);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleResponse = (response) => {
    if (isWaitingForResponse) return; // Bloque toute réponse supplémentaire

    setIsWaitingForResponse(true); // Désactive les options de réponse

    const userMessage = {
      id: Date.now(),
      text: response.text,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const nextMessage = messagesData.find((msg) => msg.id === response.id);
      if (nextMessage) {
        setMessages((prevMessages) => [...prevMessages, nextMessage]);
        setResponseOptions(nextMessage.responses);
      }
      setIsWaitingForResponse(false); // Réactive les réponses après la réponse du système
    }, 1000);
  };

  return (
    <div className="rezo-app">
      <div className="header">
        <span className="app-version">v1.2</span>
        <span className="header-title">Rezo</span>
        <img src={fakeProfile} alt="Profil" className="profile-pic" />
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Cache les réponses tant que le système n'a pas répondu */}
        {!isWaitingForResponse && (
          <div className="response-options">
            {responseOptions.map((response, index) => (
              <button key={index} onClick={() => handleResponse(response)}>
                {response.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RezoApp;
