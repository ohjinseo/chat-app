import moment from "moment";
import React from "react";
import "../main.css";

const User = ({ user }) => {
  console.log(user);
  return (
    <div className="user__container">
      <span>{user.name}</span>
      <span>{moment(user.createdAt).fromNow()} 가입 </span>
    </div>
  );
};

export default User;
