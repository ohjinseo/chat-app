import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService, firebaseInstance } from "../myBase";
import "../main.css";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event; //same as event.target.name, event.target.value

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(email, password);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocialClick = () => {
    let provider = new firebaseInstance.auth.GoogleAuthProvider();
    try {
      authService.signInWithPopup(provider);
      setError("");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="auth__container">
      <h2>Chat App</h2>
      <form className="auth__form" onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        ></input>
        <p>{error ? error : ""}</p>
        <input type="submit" value="Login"></input>
      </form>

      <button onClick={onSocialClick} name="google">
        Continue with Google
      </button>
      <button>
        <Link className="link" to="/createaccount">
          CreateAccout
        </Link>
      </button>
    </div>
  );
};

export default Auth;
