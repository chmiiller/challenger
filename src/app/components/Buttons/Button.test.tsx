import { fireEvent, render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";

import Button from "./Button";

describe("When rendering a Button", () => {
  it("should render the button with the correct text", () => {
    const mockLabel = "Buy tickets now!";

    render(<Button label={mockLabel} onClick={() => {}} />);

    const button = screen.getByRole("button", { name: mockLabel });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(mockLabel);
  });

  it("should render the button and onClick should be called", () => {
    const mockLabel = "Buy tickets now!";
    const mockOnClick = vi.fn();
    render(<Button label={mockLabel} onClick={mockOnClick} />);

    const button = screen.getByRole("button", { name: mockLabel });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
