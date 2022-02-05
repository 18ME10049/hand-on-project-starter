import React from "react";
// import photo from "./photo.svg";
import Card from "../Card/Card";

const Cards = ({ cards }) => {
  return (
    <>
      <section>
        <div className="work-container container">
          <h3 className="main-heading">All APIs</h3>
          <div className="row">
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cards;
