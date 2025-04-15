import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import { Card } from "../Card";

describe("When rendering IconLabel", () => {
  const mockEvent = {
    id: 8,
    name: "The Weeknd",
    alerts: 534,
    date: "2021-10-19T20:00:00+02:00",
    locationId: 3,
    location: {
      id: 3,
      name: "Ziggo Dome",
      city: "Amsterdam",
      country: "Netherlands",
      imageUrl: "",
    },
    description: "Tickets for The Weeknd live in Ziggo Dome",
    imageUrl: "https://mockimage.com",
  };

  it("renders the card with the correct event name", () => {
    render(<Card event={mockEvent} url={`/details/${mockEvent.id}`} />);
    expect(screen.getByText(mockEvent.name)).toBeInTheDocument();
  });

  it("renders the card with the correct image alt", () => {
    render(<Card event={mockEvent} url={`/details/${mockEvent.id}`} />);
    expect(
      screen.getByAltText(`${mockEvent.name} banner image`)
    ).toBeInTheDocument();
  });

  it("renders the card with the correct Link pointing to the correct URL", () => {
    const mockedUrl = `/details/${mockEvent.id}`;
    render(<Card event={mockEvent} url={mockedUrl} />);
    const linkElement = screen.getByRole("link");
    const att = linkElement.getAttribute("href");
    expect(linkElement).toBeInTheDocument();
    expect(att).toEqual(mockedUrl);
  });
});
