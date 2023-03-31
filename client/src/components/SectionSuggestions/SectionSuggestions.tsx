import React from 'react';
import train from '../../img/train.png';
import topEurope from '../../img/topEuropean.png';
import style from '../../styles/SectionSuggestions/SectionSuggestions.module.css';

function SectionSuggestions() {
  return (
    <div className={style.container}>
        <h2 className={style.title}>Suggestions</h2>
        <section className={style.imgsContainer}>
            <a href='https://www.cntraveller.com/gallery/best-cities-in-europe' target='_blank'>
                <img src={topEurope} alt='european cities'/>
            </a>
            <a href='https://www.thetrainline.com/' target='_blank'>
                <div className={style.microContainer}>
                    <img src={train} alt='train'/>
                    <p className={style.text}>Find the cheapest train tickets for all your train journeys! <strong>Learn more</strong></p>
                </div>
            </a>
        </section>
    </div>
  )
}

export default SectionSuggestions;