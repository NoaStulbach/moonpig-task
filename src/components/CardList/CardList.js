import React from "react";
import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ cards, onCardClick }) => {
  return (
    <ul className="card-list">
      {cards.map((card) => (
        <Card key={card.MoonpigProductNo} card={card} onClick={onCardClick} />
      ))}
    </ul>
  );
};

export default CardList;
