import React, { useState } from "react";
import "./Button.css";
import "../App.css";
import "./HomePage.css"; // Separate file for better styling management
import PostList from "./PostList";
import BrandLogo from "../assets/images/bruinbearlogo.png";

function HomePage() {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Bruin Referrals!</h1>
      </header>

      <div class="homepage-logo">
        <img
          src={BrandLogo}
          alt="Brand logo"
        />
      </div>

      <div className="homepage-content">
        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
