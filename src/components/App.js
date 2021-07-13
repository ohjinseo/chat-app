import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../myBase";
import AppRouter from "./AppRouter";
import "../main.css";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [init, setInit] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
        setUser(user);
      } else {
        setIsLogin(false);
      }
      setInit(true);
    });
  });
  return (
    <>{init ? <AppRouter isLogin={isLogin} user={user} /> : "Loading..."}</>
  );
};

export default App;
