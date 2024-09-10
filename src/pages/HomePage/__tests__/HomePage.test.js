import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HomePage from "../HomePage";

const CARDS_PER_PAGE = 40;
const TOTAL_CARDS = 100;

const mockCards = Array.from({ length: TOTAL_CARDS }, (_, index) => ({
  MoonpigProductNo: `test-card-${index}`,
  ProductImage: {
    Link: { Href: `https://via.placeholder.com/150?text=Card+${index + 1}` },
  },
  Title: `Test Card ${index + 1}`,
  ProductCategory: { Name: "Greeting Cards" },
  Price: { Currency: "$", Value: 3.99 },
}));

beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ Products: mockCards }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("displays loading initially", async () => {
  render(<HomePage onCardClick={jest.fn()} />);

  const loadingElements = screen.getAllByText(/loading/i);
  expect(loadingElements[0]).toBeInTheDocument();

  // Wait for cards to load and "Loading..." to disappear
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});

test("renders cards on homepage after loading", async () => {
  render(<HomePage onCardClick={jest.fn()} />);

  await waitFor(() => {
    const cardImages = screen.getAllByRole("img");
    expect(cardImages.length).toBe(CARDS_PER_PAGE);
  });
});

test("displays no cards available message after loading", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ Products: [] }),
    })
  );

  render(<HomePage onCardClick={jest.fn()} />);

  await waitFor(() => {
    const noCardsElements = screen.getAllByText(/no cards available/i);
    expect(noCardsElements.length).toBeGreaterThan(0);
  });
});

test("renders first page of cards with pagination after loading", async () => {
  render(<HomePage onCardClick={jest.fn()} />);

  await waitFor(() => {
    const cardImages = screen.getAllByRole("img");
    expect(cardImages.length).toBe(CARDS_PER_PAGE);
  });

  // ensure pagination is visible
  expect(screen.getByText(/Next/i)).toBeInTheDocument();
});

test("navigates to the second page of cards", async () => {
  render(<HomePage onCardClick={jest.fn()} />);

  await waitFor(() => {
    const cardImages = screen.getAllByRole("img");
    expect(cardImages.length).toBe(CARDS_PER_PAGE);
  });

  fireEvent.click(screen.getByText(/Next/i));

  // wait for the second page of cards to load
  await waitFor(() => {
    const cardImages = screen.getAllByRole("img");
    expect(cardImages.length).toBe(CARDS_PER_PAGE);
    // check that the first card on the second page is rendered
    expect(
      screen.getByAltText(`Test Card ${CARDS_PER_PAGE + 1}`)
    ).toBeInTheDocument();
  });

  expect(screen.getByText(/Previous/i)).toBeInTheDocument();
});
