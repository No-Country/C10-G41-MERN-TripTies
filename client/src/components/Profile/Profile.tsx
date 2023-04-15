import React from "react";
import styles from "../../styles/Profile/Profile.module.css";
import avatar from "../../img/avatar.png";
import Loading from "../Loading/Loading";
export default function Profile() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loading />
    </div>
  );
}
