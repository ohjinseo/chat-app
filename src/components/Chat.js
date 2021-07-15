import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../myBase";
import "moment/locale/ko";
import moment from "moment";
import "../main.css";

const Chat = ({ user }) => {
  const { chat_id } = useParams();
  const [message, setMessage] = useState("");
  const [messageArray, setMessageArray] = useState("");

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dbService.collection("chats").doc(chat_id).collection("messages").add({
      message: message,
      createdAt: Date.now(),
      messageUser: user.uid,
      userName: user.displayName,
    });
    setMessage("");
  };

  useEffect(() => {
    dbService
      .collection("chats")
      .doc(chat_id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const messageArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setMessageArray(messageArray);
      });
  }, []);

  const onDeleteClick = async (message_id) => {
    const ok = window.confirm("삭제할까");
    if (ok) {
      await dbService.doc(`chats/${chat_id}/messages/${message_id}`).delete();
    }
  };

  return (
    <div className="message__container">
      <h1>Chat</h1>
      <div className="message">
        {messageArray &&
          messageArray.map((message) => {
            return (
              <div
                className={message.messageUser === user.uid && "owner__message"}
                key={message.id}
              >
                <div className="message__content">
                  {message.messageUser === user.uid && (
                    <button
                      className="delete__btn"
                      onClick={() => onDeleteClick(message.id)}
                    >
                      delete
                    </button>
                  )}
                  <span className="user__name">{message.userName}</span>

                  <span>{message.message}</span>
                </div>
                <span className="date">
                  {moment(message.createdAt).fromNow()}
                </span>
              </div>
            );
          })}
      </div>
      <form className="message__form" onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="Input message"
          value={message}
          required
        />
        <input type="submit" value="Send"></input>
      </form>
    </div>
  );
};

export default Chat;
