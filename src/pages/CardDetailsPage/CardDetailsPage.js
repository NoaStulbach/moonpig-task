import React, { useEffect, useState } from "react";
import "./CardDetailsPage.css";

const CardDetailsPage = ({ productId, onBackClick }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(
          `https://moonpig.github.io/tech-test-frontend/product/${productId}.json`
        );
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCardData();
  }, [productId]);

  if (!card) {
    return <p aria-live="polite">Loading...</p>;
  }

  const combinedSizes = [card.Size, ...(card.AvailableSizes || [])].filter(
    (size) => size?.DisplayName && size?.Price
  );

  return (
    <div className="card-details-page">
      <button
        className="back-button"
        onClick={onBackClick}
        aria-label="Go back to card listing"
      >
        Back
      </button>
      <div className="card-details">
        <img
          src={card.ImageUrls?.[0]?.ImageUrl || "fallback-image-url"}
          alt={`Greeting card titled ${card.Title}`}
        />
        <div className="card-details-content">
          <h2>{card.Title}</h2>
          {combinedSizes.length ? (
            <div className="sizes">
              <h3 id="sizes-title" className="sizes-title">
                Available Sizes:
              </h3>
              <ul aria-labelledby="sizes-title" className="size-list">
                {combinedSizes.map((size, index) => (
                  <li key={index} className="size-item">
                    <span className="size-name">{size.DisplayName}</span>
                    <span className="highlighted">
                      {`${size.Currency}${size.Price.toFixed(2)}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="card-price">No available sizes</p>
          )}

          <button className="buy-button" disabled aria-disabled="true">
            Buy Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
