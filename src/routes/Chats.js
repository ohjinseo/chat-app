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

  const cancleAddChatRoom = () => {
    setAddBtnToggle(false);
    setChatName("");
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
    <div className="chats__container">
      <h1>Chats</h1>
      <button className="first__btn" onClick={addChatRoomName}>
        Add Chat Room
      </button>
      {addBtnToggle && (
        <div className="hidden__container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={chatName}
              onChange={onChange}
              placeholder="Input room name"
            />
            <button onClick={cancleAddChatRoom}>X</button>
            <input type="submit" value="Create Room!" required />
          </form>
        </div>
      )}
      <div className="chat">
        {chats &&
          chats.map((chat) => {
            return (
              <div key={chat.id} className="chat__container">
                <Link className="link" to={{ pathname: `/chat/${chat.id}` }}>
                  {chat.chatName}
                </Link>
                <span>{moment(chat.createdAt).fromNow()}에 생성</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chats;
