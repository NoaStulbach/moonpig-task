import React, { useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import CardDetailsPage from "./pages/CardDetailsPage/CardDetailsPage";
import "./App.css";

const App = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (productId) => {
    setSelectedCard(productId);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  return (
    <div className="App">
      {selectedCard ? (
        <CardDetailsPage
          productId={selectedCard}
          onBackClick={handleBackClick}
        />
      ) : (
        <HomePage onCardClick={handleCardClick} />
      )}
    </div>
  );
};

export default App;
