import React, { useEffect, useState } from "react";
import CardList from "../../components/CardList/CardList";
import "./HomePage.css";
import ReactPaginate from "react-paginate";

const HomePage = ({ onCardClick }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 40;

  useEffect(() => {
    setLoading(true);
    fetch("https://moonpig.github.io/tech-test-frontend/search.json")
      .then((response) => response.json())
      .then((data) => {
        // filter out non-greeting card products
        const greetingCards = data.Products.filter(
          (product) =>
            product.ProductCategory &&
            product.ProductCategory.Name &&
            product.ProductCategory.Name.toLowerCase() === "greeting cards"
        );
        setCards(greetingCards);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  }, []);

  // pagination logic
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * cardsPerPage;
  const currentCards = cards.slice(offset, offset + cardsPerPage);
  const pageCount = Math.ceil(cards.length / cardsPerPage);

  return (
    <div className="homepage">
      <h1>🐷 Moonpig Card Shop 🐷</h1>
      <div className="loading" aria-live="polite">
        {loading && <p>Loading cards...</p>}
      </div>

      <CardList cards={currentCards} onCardClick={onCardClick} />

      <div className="no-cards" aria-live="assertive">
        {!loading && cards.length === 0 && <p>No cards available</p>}
      </div>

      {!loading && cards.length > 0 && (
        <nav aria-label="Pagination Navigation">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </nav>
      )}
    </div>
  );
};

export default HomePage;
