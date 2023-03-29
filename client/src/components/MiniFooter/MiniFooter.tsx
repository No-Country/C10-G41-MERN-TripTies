import React from 'react';
import style from '../../styles/MiniFooter/MiniFooter.module.css';

function MiniFooter() {
  return (
    <div className={style.container}>
        <a href='/about'>About us</a>
        <a href='/contact'>Contact</a>
    </div>
  )
}

export default MiniFooter;