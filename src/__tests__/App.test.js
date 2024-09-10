import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import App from "../App";

const mockCardDetails = () => ({
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

const mockCardListings = () => ({
  json: () =>
    Promise.resolve({
      Products: Array.from({ length: 40 }, (_, index) => ({
        MoonpigProductNo: `test-card-${index}`,
        ProductImage: {
          Link: {
            Href: `https://via.placeholder.com/150?text=Card+${index + 1}`,
          },
        },
        Title: `Test Card ${index + 1}`,
        ProductCategory: { Name: "Greeting Cards" },
        Price: { Currency: "$", Value: 3.99 },
      })),
    }),
});

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation((url) => {
    return url.includes("product")
      ? Promise.resolve(mockCardDetails())
      : Promise.resolve(mockCardListings());
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders HomePage by default", async () => {
  await act(async () => {
    render(<App />);
  });
  expect(screen.getByText(/🐷 Moonpig Card Shop 🐷/i)).toBeInTheDocument();
});

test("renders CardDetailsPage when a card is selected", async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByText(/🐷 Moonpig Card Shop 🐷/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText(/Test Card 1/i)[0]);

  await waitFor(() => {
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
  });

  expect(screen.getByText(/Back/i)).toBeInTheDocument();
});

test("clicking back button returns to HomePage", async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(screen.getByText(/🐷 Moonpig Card Shop 🐷/i)).toBeInTheDocument();
    const cards = screen.getAllByText(/Test Card 1/i);
    expect(cards.length).toBeGreaterThan(0);
  });

  fireEvent.click(screen.getAllByText(/Test Card 1/i)[0]);

  await waitFor(() => {
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/Back/i));

  await waitFor(() => {
    expect(screen.getByText(/🐷 Moonpig Card Shop 🐷/i)).toBeInTheDocument();
  });
});
