import React from "react";
import "../main.css";

const User = ({ user }) => {
  console.log(user);
  return <div>{user.name}</div>;
};

export default User;
