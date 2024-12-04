import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faINofCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BrandLogo from "../assets/Ucla-logo.png";
import "./register.css";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(ucla\.edu|g\.ucla\.edu)/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
  const userRef = useRef();
  const emailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidUser(result);
    console.log("User: ", user, result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    console.log("Email: ", email, result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPwd(result);
    const match = password === matchPwd;
    setValidMatch(match);
    console.log("Password: ", password, result);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, password, email, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Check if button was enabled before form
    completion (JS Hack) */
    if (
      !USER_REGEX.test(user) ||
      !EMAIL_REGEX.test(email) ||
      !PWD_REGEX.test(password)
    ) {
      setErrMsg("Invalid Input");
      return;
    }
    try {
      const response = await axios.post(
        "/register",
        JSON.stringify({
          username: user,
          email: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPassword("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No response from server");
      } else if (err.response.status === 409) {
        setErrMsg("User or email already in use");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="login">Now Sign in with your new account.</a>
          </p>
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
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username
              <span className={validUser ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validUser || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={!validUser}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validUser ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Username must be between 4 and 24 characters long <br />
              and start with a letter. <br />
              Numbers, Letters, underscrores, hypens allowed.
            </p>
            <label htmlFor="email">
              Email
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={!validEmail}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p
              id="emailnote"
              className={
                emailFocus && email && !validEmail
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Email must be a valid UCLA email address.
            </p>
            <label htmlFor="password">
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={!validPwd}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Password must be between <br />
              8 and 24 characters. <br />
              Password must have at least an uppercase letter, <br />
              a lowercase letter, a number, and a special character. <br />
              Allowed Special Characters: !@#$%
            </p>

            <label htmlFor="matchpwd">
              Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="matchpwd"
              autoComplete="off"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={!validMatch}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="matchnote"
              className={
                matchFocus && matchPwd && !validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Passwords must match.
            </p>
            <button
              disabled={!validUser || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <br />
            <span className="line">
              {/* Put Router Link Here*/}
              <a href="/login"> Login</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default SignUp;
