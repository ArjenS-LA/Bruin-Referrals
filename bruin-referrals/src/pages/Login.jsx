import { useRef, useState, useEffect, useContext } from "react";
// import { AuthContext } from "../auth/AuthProvider";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

/* Dave Gray User Login and Authentication with Axios*/
/* https://www.youtube.com/watch?
v=X3qyxo_UTR4&ab_channel=DaveGray */

/* Login Page made with react hooks */
const Login = () => {
  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, password]);

  // If use fetch, include credentials: "include" in the options object
  // If use axios, include withCredentials: true in the options object
  // Handle form submission with global error handling
  const handleSumbit = async (e) => {
    e.preventDefault();
    // Integrate axios and global state for authentication
    setUser("");
    setEmail("");
    setPassword("");
    setSuccess(true); // REPLACE LATER
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>You have successfully signed in</p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={error ? "error" : "offscreen"}
            aria-live="assertive"
          >
            {error}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSumbit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autocomplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autocomplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              autocomplete="off"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {/* No onClick event needed */}
            <button>Sign In</button>
          </form>
          <p>
            Don't have an account? <br />
            <span className="line">
              {/* Put Router Link here to sign up */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
