import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../myBase";
import "../main.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event; //same as event.target.name, event.target.value

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(email, password);
      history.push("/");
      const user = authService.currentUser;
      await user.updateProfile({
        displayName: name,
      });
      await dbService.collection("users").add({
        name: name,
        createdAt: Date.now(),
        userId: user.uid,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
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

        <input
          name="name"
          type="name"
          placeholder="Name"
          required
          value={name}
          onChange={onChange}
        />
        <input type="submit" value="Create Account"></input>
      </form>
      <p>{error ? error : ""}</p>
    </>
  );
};

export default CreateAccount;
