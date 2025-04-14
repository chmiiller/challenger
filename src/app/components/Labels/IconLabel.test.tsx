import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "vitest";

import IconLabel from "./IconLabel";

describe("When rendering IconLabel", () => {
  it("renders the label with the correct text", () => {
    const mockText = "Human After All";
    render(
      <IconLabel label={mockText}>
        <div></div>
      </IconLabel>
    );
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});
