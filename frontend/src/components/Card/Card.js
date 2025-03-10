import React from "react";
import style from './Card.module.scss'
// eslint-disable-next-line no-unused-vars
const Card = (card) => {
  return (
    <div className={style.container}>
    <div className={style.post}>
        <div className={style.header_post}>
            <img src={card.image} alt="" />
        </div>

        <div className={style.body_post}>
            <div className={style.post_content}>

                <h1>{card.name}</h1>
                <p>{card.description}</p>

            </div>
        </div>
    </div>
</div>
  );
};

export default Card;