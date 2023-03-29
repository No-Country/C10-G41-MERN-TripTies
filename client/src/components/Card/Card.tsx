import React from 'react'
import style from '../../styles/Card/Card.module.css';
import avatar from '../../img/avatar.png'
import menuVertical from '../../img/menu-vertical.png'
import coffee from '../../img/coffee.png'
import location from '../../img/smallPin.png'
import londonCoffee from '../../img/coffeLondon.png'
import boldHeart from '../../img/heart-circle-bold.png'
import message from '../../img/message-text.png'
import messageBig from '../../img/bigMessageText.png'
import share from '../../img/send-2.png'
import heart from '../../img/heart-circle.png'
import save from '../../img/archive-tick.png'
import stars from '../../img/stars.png'


function Card() {
  return (
    <section className={style.container}>
        <img src={avatar} alt="avatar"/>
        <section className={style.content}>
        <div className={style.userInfo}>
            <aside>
                <h4 className={style.name}>Jane Johnson</h4>
                <span>2 hours</span>
            </aside>
            <img className={style.dotMenu} src={menuVertical} alt="dots menu"/>
        </div>
        <article>
            <p className={style.description}>In love with this cute little café I found in London. Great prices and delicious food!!! It's called Bartons and it's located in Bermondsey #London #CofeeShop</p>
        </article>
        <div className={style.publicationInfo}>
            <aside>
            <img src={stars} alt="stars"/>
            </aside>
            <aside>
                <img src={coffee} alt="coffe"/>
                <span>Food & beverage</span>
            </aside>
            <aside>
                <img src={location} alt="location"/>
                <span>London, UK</span>
            </aside>
        </div>
        <img src={londonCoffee} alt="london coffee"/>
        <div className={style.likesAndComments}>
            <aside>
                <img src={boldHeart} alt="bold heart"/>
                <span>32</span>
            </aside>
            <aside>
                <img src={message} alt="message"/>
                <span>4</span>
            </aside>
        </div>
        <div className={style.actions}>
            <aside>
                <img src={heart} alt="heart"/>
                <img src={messageBig} alt="message"/>
                <img src={share} alt="share"/>
            </aside>
            <img src={save} alt="save thick"/>
        </div>
        </section>
    </section>
  )
}

export default Card