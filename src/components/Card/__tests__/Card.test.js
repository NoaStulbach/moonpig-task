import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";

const mockCard = {
  MoonpigProductNo: "test-card-1",
  ProductImage: { Link: { Href: "https://via.placeholder.com/150" } },
  Title: "Test Card",
  Price: { Currency: "$", Value: 3.99 },
};

test("renders card with correct title, image, and price", () => {
  render(<Card card={mockCard} onClick={() => {}} />);

  const imageElement = screen.getByAltText(/Test Card/i);
  expect(imageElement).toBeInTheDocument();
  expect(imageElement.src).toContain("https://via.placeholder.com/150");

  const titleElement = screen.getByText(/Test Card/i);
  expect(titleElement).toBeInTheDocument();

  const priceElement = screen.getByText(/\$3.99/i);
  expect(priceElement).toBeInTheDocument();
});

test("clicking on card triggers onClick function", () => {
  const handleClick = jest.fn(); // mock click handler
  render(<Card card={mockCard} onClick={handleClick} />);

  // simulate click event and check if handleClick() is called
  const cardElement = screen.getByText(/Test Card/i);
  fireEvent.click(cardElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
