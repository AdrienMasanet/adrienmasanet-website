import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button component", () => {
  it("should render the button with the correct text", () => {
    render(<Button text="Click me !" color="primary" />);

    expect(screen.getByText("Click me !")).toBeInTheDocument();
  });

  it("should have primary or secondary class based on color prop", () => {
    const { rerender } = render(<Button text="Click me !" color="primary" />);

    expect(screen.getByText("Click me !")).toHaveClass("primary");

    rerender(<Button text="Click me !" color="secondary" />);

    expect(screen.getByText("Click me !")).toHaveClass("secondary");
  });

  it("should set appropriate mouseHovering state when mouse enters and leaves", () => {
    render(<Button text="Click me !" color="primary" />);

    const button = screen.getByText("Click me !");
    const shinyEffect = screen.getByTestId("shiny-effect");

    fireEvent.mouseEnter(button);

    expect(shinyEffect).toHaveClass("active");

    fireEvent.mouseLeave(button);

    expect(shinyEffect).not.toHaveClass("active");
  });

  it("should set type as submit if isSubmit is true", () => {
    render(<Button text="Click me !" color="primary" isSubmit={true} />);

    expect(screen.getByText("Click me !").closest("button")).toHaveAttribute(
      "type",
      "submit"
    );
  });

  it("should set type as button if isSubmit is false or undefined", () => {
    const { rerender } = render(
      <Button text="Click me !" color="primary" isSubmit={false} />
    );

    expect(screen.getByText("Click me !").closest("button")).toHaveAttribute(
      "type",
      "button"
    );

    rerender(<Button text="Click me !" color="primary" />);

    expect(screen.getByText("Click me !").closest("button")).toHaveAttribute(
      "type",
      "button"
    );
  });
});
