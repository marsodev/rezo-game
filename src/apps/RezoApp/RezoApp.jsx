import React, { useState, useEffect, useRef } from "react";
import "./RezoApp.css";
import rezoLogo from "../../assets/img/logo-full.png";
import messagesData from "./data/messages.json";
import fakeProfile from "../../assets/img/fake-profile.png";

const RezoApp = () => {
  const [messages, setMessages] = useState([]);
  const [responseOptions, setResponseOptions] = useState([]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages"));
    const savedResponseOptions = JSON.parse(
      localStorage.getItem("responseOptions")
    );

    if (savedMessages && savedResponseOptions) {
      setMessages(savedMessages);
      setResponseOptions(savedResponseOptions);
    } else {
      setMessages([messagesData[0]]);
      setResponseOptions(messagesData[0].responses);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
    if (responseOptions.length > 0) {
      localStorage.setItem("responseOptions", JSON.stringify(responseOptions));
    }
  }, [messages, responseOptions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleResponse = (response) => {
    if (isWaitingForResponse) return;

    setIsWaitingForResponse(true);

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
      setIsWaitingForResponse(false);
    }, 1000);
  };

  return (
    <div className="rezo-app">
      <div className="header">
        <span className="app-version">v1.2</span>
        <img src={rezoLogo} alt="logo rezo" className="header-title" />
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
