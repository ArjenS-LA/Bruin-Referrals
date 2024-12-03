import React, { useState } from "react";
import "./Button.css";
import "../App.css";
import "./HomePage.css"; // Separate file for better styling management
import PostList from "./PostList";

function HomePage() {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const goToSignIn = () => {
    window.location.href = "/signin";
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Bruin Referrals</h1>
        <button className="sign-up-button" onClick={goToSignIn}>
          Sign Up
        </button>
      </header>

      <div className="homepage-content">
        <div className="input-container">
          <input
            type="text"
            placeholder="Type something..."
            value={userInput}
            onChange={handleInputChange}
            className="user-input"
          />
          <p className="input-display">You typed: {userInput}</p>
        </div>

        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
