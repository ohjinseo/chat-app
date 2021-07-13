import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../main.css";

const Navigation = ({ handleProfileModal }) => {
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/chats">Chats</Link>
      <button onClick={handleProfileModal}>
        <Link to="/profile">My Profile</Link>
      </button>
    </div>
  );
};

export default Navigation;
