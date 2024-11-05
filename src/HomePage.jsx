import React, { useState } from 'react';
import './Button.css' 

//Login section
import {Login} from "./Login";

function HomePage() {
    const [userInput, setUserInput] = useState('');

    //HELPER FUNCTION
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }
    
    return (
    <div style={{ backgroundColor: 'lightBlue', height: '100vh', 
    textAlign: 'left', padding: '10px' }}>
      <h1>Bruin Referrals</h1>
      <h2><button className="styled-button" onClick={() => alert('Button Clicked!')}>Search</button></h2>
      <p>This is a basic homepage created with React.</p>

      {/* Input field for user to type in */}
      <input
        type="text"
        placeholder="Type something..."
        value={userInput}
        onChange={handleInputChange}
        style={{ padding: '10px', fontSize: '16px' }}
      />

      {/* Display the user's input */}
      <p>You typed: {userInput}</p>

      <button onClick={() => alert('Button Clicked!')}>Click Me</button>


      <Login />

    </div>
  );
}

export default HomePage;