import React from "react";

const Card = ({ card }) => {
  return (
    <div className="col-4 col-lg-3 text-center work-container-subdiv">
      <div>
        <img src={card.image} alt="" />
      </div>
      <h2 className="sub-heading">{card.name}</h2>
      <p className="main-hero-para w-100">{card.description}</p>
    </div>
  );
};

export default Card;
