import React from "react";
import "./Card.css";

const Card = ({ card, onClick }) => {
  return (
    <div
      className="card"
      role="button"
      onClick={() => onClick(card.MoonpigProductNo)}
    >
      <img src={card.ProductImage.Link.Href} alt={card.Title} />
      <h3>{card.Title}</h3>
      <p className="card-price">{`${
        card.Price.Currency
      }${card.Price.Value.toFixed(2)}`}</p>
    </div>
  );
};

export default Card;
