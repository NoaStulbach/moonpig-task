import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardDetailsPage from "../CardDetailsPage";

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: () =>
      Promise.resolve({
        Title: "Test Card",
        ImageUrls: [{ ImageUrl: "https://via.placeholder.com/150" }],
        Size: { DisplayName: "Standard", Price: 3.49, Currency: "£" },
        AvailableSizes: [
          { DisplayName: "Large", Price: 4.99, Currency: "£" },
          { DisplayName: "Giant", Price: 7.99, Currency: "£" },
        ],
      }),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("fetches and displays card details", async () => {
  render(<CardDetailsPage productId="test-card-1" onBackClick={() => {}} />);

  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
  });

  const cardImage = screen.getByAltText(/Test Card/i);
  expect(cardImage).toBeInTheDocument();
  expect(cardImage.src).toContain("https://via.placeholder.com/150");

  expect(screen.getByText(/Standard/i)).toBeInTheDocument();
  expect(screen.getByText(/£3.49/i)).toBeInTheDocument();
  expect(screen.getByText(/Large/i)).toBeInTheDocument();
  expect(screen.getByText(/£4.99/i)).toBeInTheDocument();
  expect(screen.getByText(/Giant/i)).toBeInTheDocument();
  expect(screen.getByText(/£7.99/i)).toBeInTheDocument();
});

test("clicking back button triggers onBackClick", async () => {
  const handleBackClick = jest.fn();
  render(
    <CardDetailsPage productId="test-card-1" onBackClick={handleBackClick} />
  );

  await waitFor(() => {
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Back/i));
  expect(handleBackClick).toHaveBeenCalledTimes(1);
});
