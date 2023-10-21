import { render, screen } from "@testing-library/react";

import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner component", () => {
  it("should have active class if active", () => {
    render(<LoadingSpinner active={true} />);

    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).toHaveClass("active");
  });

  it("should not have active class if not active", () => {
    render(<LoadingSpinner active={false} />);

    const loadingSpinner = screen.getByTestId("loading-spinner");
    expect(loadingSpinner).not.toHaveClass("active");
  });
});
