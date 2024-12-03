import React, { useState } from "react";
import "./Button.css";
import "../App.css";
import PostList from "./PostList";

function HomePage() {
  const [userInput, setUserInput] = useState("");

  ////////////////////////////////////////////
  //HELPER FUNCTIONS /////////////////////////
  ////////////////////////////////////////////
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const goToSignIn = () => {
    window.location.href = "/signin";
  };

  return (
    <div>
      <h1>Bruin Referrals</h1>
      <h2>
        <button className="styled-button" onClick={goToSignIn}>
          Sign Up
        </button>
      </h2>
      <p>This is a basic homepage created with React.</p>

      {/* Input field for user to type in */}
      <input
        type="text"
        placeholder="Type something..."
        value={userInput}
        onChange={handleInputChange}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      {/* Display the user's input */}
      <p>You typed: {userInput}</p>

      {/* Post List component */}
      <div>
        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
