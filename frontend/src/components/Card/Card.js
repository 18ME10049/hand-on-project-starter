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
export default Card;