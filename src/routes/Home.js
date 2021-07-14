import React, { useEffect, useState } from "react";
import User from "../components/User";
import { dbService } from "../myBase";
import "../main.css";

const Home = () => {
  const [users, setUsers] = useState("");
  useEffect(() => {
    dbService
      .collection("users")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const userArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }; //doc.data에 우리가 추가한 객체가 담김.
        });

        setUsers(userArray);
      });
  }, []);
  return (
    <div className="home__container">
      <h1>Users</h1>
      <div className="user">
        {users && users.map((user) => <User key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default Home;
