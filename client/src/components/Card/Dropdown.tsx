import React from "react";
import style from "../../styles/Card/Dropdown.module.css";

function Dropdown({ display, name }: string | any) {
  const data: any = window.localStorage.getItem("users");
  const user = JSON.parse(data);
  // const Name = name.split(" ");
  // const firstName = Name[0];

  return (
    <div className={style.container} style={{ display: display }}>
      {user?.name === name ? (
        <ul>
          <li className={style.dropdownElement}>
            <p>Edit</p>
          </li>
          <li className={style.dropdownElement}>
            <p>Copy link</p>
          </li>
          <li className={style.dropdownElement}>
            <p>Delete post</p>
          </li>
        </ul>
      ) : (
        <ul>
          <li className={style.dropdownElement}>
            <p>Add to bucket list</p>
          </li>
          <li className={style.dropdownElement}>
            <p>Copy link</p>
          </li>
          <li className={style.dropdownElement}>
            <p>Hide post</p>
          </li>
          <li className={style.dropdownElement}>
            <p>Unfollow</p>
          </li>
          <li className={style.dropdownElement}>
            <p style={{ color: "red" }}>Report</p>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
