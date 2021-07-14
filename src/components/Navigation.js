import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../main.css";

const Navigation = ({ handleProfileModal }) => {
  return (
    <div className="navigation">
      <Link className="link" to="/">
        <span>Home</span>
      </Link>
      <Link className="link" to="/chats">
        Chats
      </Link>
      <button onClick={handleProfileModal}>
        <Link className="link" to="/profile">
          My Profile
        </Link>
      </button>
    </div>
  );
};

export default Navigation;
