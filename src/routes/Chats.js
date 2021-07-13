import React, { useEffect, useState, useParams } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../myBase";
import "moment/locale/ko";
import moment from "moment";
import "../main.css";

const Chats = ({ setChatRoom }) => {
  const [chats, setChats] = useState("");
  const [chatName, setChatName] = useState("");
  const [addBtnToggle, setAddBtnToggle] = useState(false);

  const addChatRoomName = () => {
    setAddBtnToggle(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("chats").add({
      chatName: chatName,
      createdAt: Date.now(),
    });
    setChatName("");
    setAddBtnToggle(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setChatName(value);
  };

  useEffect(() => {
    dbService
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setChats(chatArray);
      });
  }, []);

  return (
    <>
      <button onClick={addChatRoomName}>Add ChatRoom</button>
      {addBtnToggle && (
        <form onSubmit={onSubmit}>
          <input type="text" value={chatName} onChange={onChange} />
          <input type="submit" value="Create Room!" required />
        </form>
      )}
      {chats &&
        chats.map((chat) => {
          return (
            <div key={chat.id}>
              {moment(chat.createdAt).fromNow()}에 생성
              <Link to={{ pathname: `/chat/${chat.id}` }}>{chat.chatName}</Link>
            </div>
          );
        })}
    </>
  );
};

export default Chats;
