import React, { useState } from "react";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    setList((prevList) => [...prevList, { sender: "user", text }]);

    try {
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_question: text })
      });

      const data = await response.json();
      setList((prevList) => [...prevList, { sender: "bot", text: data.answer }]);
    } catch (error) {
      setList((prevList) => [...prevList, { sender: "bot", text: "Error fetching response" }]);
    }

    setText("");
  };

  return (
    <>
      <header>
        <div className="pi-logo-container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f79dc980785195fd3166013cad9c1586b951369"
            alt="Pi DataCenters Logo"
            className="pi-logo"
          />
        </div>
          <h1 className="storm-heading">Built Using Pi STORM Framework</h1>
        <div className="gemini-logo-container">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/70ca9ac2c207467b41d72b8101cb4d14fa04ed15"
            alt="Google Gemini Logo"
            className="gemini-logo"
          />
        </div>
      </header>
      <div className="left-section">

      <div className="mainheading-container">
        <h1 className="mainheading-text">RAG Chatbot</h1>
      </div>

      <div className="sub-heading">
        <h2 className="sub-text">
          Intelligent Assistance by Pi DataCenters Powered by Google Gemini
        </h2>
        <h2 className="sub-text-one">Welcome! How can I assist you today?</h2>
      </div>
{list.length > 0 && (
  <div className="chat-history">
    <ul>
      {list.map((item, index) => (
        <li key={index} className="chat-message">
          <img
            src={
              item.sender === "user"
                ? "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                : "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            }
            alt={`${item.sender} icon`}
            className="chatbot-icon"
          />
          <div className="chatmain">
            <span className="chatanswer">{item.sender === "user" ? "You" : "Bot"}:</span> {item.text}
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

      <form className="input-content" onSubmit={handleSubmit}>
        <input
          className="chatbot-input"
          type="text"
          name="text"
          value={text}
          placeholder="Type your question here..."
          onChange={handleInputChange}
        />
        <button className="button-text" type="submit">
          Submit
        </button>
      </form>
      </div>

      <footer className="footer">
        <p className="footer-text">
          © 2025 Pi DataCenters. Powered by Google Gemini
        </p>
      </footer>
    </>
  );
};

export default Chatbot;       