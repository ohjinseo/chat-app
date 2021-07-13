import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService, firebaseInstance } from "../myBase";
import "../main.css";
const Profile = ({ user }) => {
  const [editProfile, setEditProfile] = useState(false);
  const [newName, setNewName] = useState("");
  const history = useHistory();
  const [error, setError] = useState(false);

  const onLogout = () => {
    authService.signOut();
    history.push("/");
  };

  const onEditProfile = () => {
    setEditProfile(true);
  };

  const onChangeName = (event) => {
    const {
      target: { value },
    } = event;
    setNewName(value);
  };

  const onChangeNameSubmit = async (event) => {
    event.preventDefault();
    if (user.displayName !== newName) {
      await user.updateProfile({
        displayName: newName,
      });
      const a = dbService.collection("users").where("userId", "==", user.uid);
      a.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ name: newName });
          //https://stackoverflow.com/questions/49682327/how-to-update-a-single-firebase-firestore-document
        });
      });
      setNewName("");
      setEditProfile(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  const cancleEditProfile = () => {
    setEditProfile(false);
    setNewName("");
    setError(false);
  };

  return (
    <div className="profile">
      <p>{user.displayName}</p>
      <button onClick={onEditProfile}>이름 수정</button>
      {editProfile && (
        <>
          <form onSubmit={onChangeNameSubmit}>
            <input type="name" value={newName} onChange={onChangeName}></input>
            <input type="submit" value="변경" />
          </form>
          {error && <p>중복ㅋ</p>}
          <button onClick={cancleEditProfile}>취소</button>
        </>
      )}
      <p>{user.email}</p>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
