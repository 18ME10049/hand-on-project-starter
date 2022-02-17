import React from "react";
import styles from './Card.module.scss'
// eslint-disable-next-line no-unused-vars
const Card = (card) => {
  function fun() {
      if(card.endpoint.indexOf("http") == -1)window.open(`//${card.endpoint}`, '_blank').focus();
      else window.open(`${card.endpoint}`, '_blank').focus();
  }
  return (
    <div className={styles.card} onClick = {fun}>
      <img src={card.image} className={styles.cardImgTop} alt="API" />
      <span className={styles.cardTitle}>{card.name}</span>
      <div className={styles.cardBody}>
        <p className={styles.cardText}>{card.description}</p>
      </div>
    </div>
  );
};

{/* <div className={style.container}>
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
</div> */}

export default Card;