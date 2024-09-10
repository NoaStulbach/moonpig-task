import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "../CardList";

const mockCards = [
  {
    MoonpigProductNo: "test-card-1",
    ProductImage: { Link: { Href: "https://via.placeholder.com/150" } },
    Title: "Test Card 1",
    Price: { Currency: "$", Value: 3.99 },
  },
  {
    MoonpigProductNo: "test-card-2",
    ProductImage: { Link: { Href: "https://via.placeholder.com/150" } },
    Title: "Test Card 2",
    Price: { Currency: "$", Value: 4.99 },
  },
];

test("renders card list with cards", () => {
  render(<CardList cards={mockCards} onCardClick={() => {}} />);

  const cardElements = screen.getAllByRole("img");
  expect(cardElements.length).toBe(2);

  const cardTitle = screen.getByText(/Test Card 1/i);
  expect(cardTitle).toBeInTheDocument();
});
