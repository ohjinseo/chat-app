import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Chats from "../routes/Chats";
import CreateAccount from "../routes/CreateAccount";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Chat from "./Chat";
import Navigation from "./Navigation";
import "../main.css";

const AppRouter = ({ isLogin, user }) => {
  const [myProfileModal, setMyProfileModal] = useState(false);
  const [socialUser, setSocialUser] = useState(false);

  const handleProfileModal = () => {
    setMyProfileModal(!myProfileModal);
  };

  return (
    <div className="main__container">
      <Router>
        <Switch>
          {isLogin ? (
            <>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/profile">
                <Profile myProfileModal={myProfileModal} user={user} />
              </Route>

              <Route exact path="/chats">
                <Chats />
              </Route>

              <Route path="/chat/:chat_id">
                <Chat user={user} />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>

              <Route exact path="/createaccount">
                <CreateAccount user={user} />
              </Route>
            </>
          )}
        </Switch>
        {isLogin && <Navigation handleProfileModal={handleProfileModal} />}
      </Router>
    </div>
  );
};

export default AppRouter;
