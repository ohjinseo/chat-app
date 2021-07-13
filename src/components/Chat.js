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
    <>
      {messageArray &&
        messageArray.map((message) => {
          return (
            <div key={message.id}>
              {message.userName}
              {moment(message.createdAt).fromNow()}

              {message.message}
              {message.messageUser === user.uid && (
                <button onClick={() => onDeleteClick(message.id)}>삭제</button>
              )}
            </div>
          );
        })}
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={message} required />
        <input type="submit" value="Send"></input>
      </form>
    </>
  );
};

export default Chat;
