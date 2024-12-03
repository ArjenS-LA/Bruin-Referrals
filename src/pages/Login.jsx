import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

import axios from "../api/axios";
import "./register.css";

import BrandLogo from "../assets/Ucla-logo.png";

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
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  // If use fetch, include credentials: "include" in the options object
  // If use axios, include withCredentials: true in the options object
  // Handle form submission with global error handling
  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ username: user, email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setUser("");
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Server Error");
      } else if (error.response.status === 401) {
        setErrMsg("Incorrect username or password");
      } else if (error.response.status === 400) {
        setErrMsg("Invalid Input");
      } else {
        setErrMsg("Login failed");
      }
    }
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
          <span>
            <img
              src={BrandLogo}
              alt="Brand logo"
              style={{ width: "200px", height: "auto" }}
            />
          </span>
          <p
            ref={errRef}
            className={errMsg ? "error" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
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
