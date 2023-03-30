import React from 'react';
import style from '../../styles/NavBar/DropdownUser.module.css';
import { useNavigate } from 'react-router-dom';

function DropdownUser({ display }: string | any ) {
  return (
    <div className={style.container} style={{ display: display }}>
        <ul>
            <li className={style.dropdownElement}><p>View profile</p></li>
            <li className={style.dropdownElement}><p>Account settings</p></li>
            <li className={style.dropdownElement}><p style={{ color: "var(--brown)"}}>Log out</p></li>
        </ul>
    </div>
  )
}

export default DropdownUser