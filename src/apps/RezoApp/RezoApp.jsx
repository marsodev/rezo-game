import React, { useState, useEffect } from "react";
import "./RezoApp.css";
import messagesData from "./data/messages.json";

const wrongResponses = [
  "Ce n'est pas la réponse que j'attendais.",
  "Tu es bizarre, ça va ? Tu ne réagis pas comme ça d'habitude.",
  "Hum... Ce n'est pas ce que je voulais entendre.",
  "Je pense que tu n'as pas bien compris.",
  "Ce n'est pas la bonne direction, essaie encore.",
  "Ça ne ressemble pas à ce que j'attendais.",
];

const RezoApp = () => {
  const [messages, setMessages] = useState([]);
  const [responseOptions, setResponseOptions] = useState([]);
  const [responseStatus, setResponseStatus] = useState("");

  useEffect(() => {
    setMessages([messagesData[0]]);
    setResponseOptions(messagesData[0].responses);
  }, []);

  const handleResponse = (responseId) => {
    const nextMessage = messagesData.find((msg) => msg.id === responseId);

    if (nextMessage.id === 4 || nextMessage.id === 5) {
      setResponseStatus(
        wrongResponses[Math.floor(Math.random() * wrongResponses.length)]
      );
    } else {
      setResponseStatus("");
    }

    setMessages([...messages, nextMessage]);
    setResponseOptions(nextMessage.responses);
  };

  return (
    <div className="rezo-app">
      <div className="header">
        <div className="logo">Rezo</div>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        {responseStatus && (
          <div className="response-status">
            <p>{responseStatus}</p>
          </div>
        )}

        <div className="response-options">
          {responseOptions.map((response, index) => (
            <button key={index} onClick={() => handleResponse(response.id)}>
              {response.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RezoApp;
