import "@/testing/__mocks__/intersectionObserverMock";

import { render, screen } from "@testing-library/react";

import PersonalityTrait from "./PersonalityTrait";

describe("PersonalityTrait component", () => {
  it("should render the passed name", () => {
    render(
      <PersonalityTrait
        name="test name"
        description="test description"
        image="http://test-image"
      />
    );

    expect(screen.getByText("test name")).toBeInTheDocument();
  });

  it("should render the passed description", () => {
    render(
      <PersonalityTrait
        name="test name"
        description="test description"
        image="http://test-image"
      />
    );

    expect(screen.getByText("test description")).toBeInTheDocument();
  });

  it("should render the passed image", () => {
    render(
      <PersonalityTrait
        name="test name"
        description="test description"
        image="http://test-image"
      />
    );

    const image: HTMLImageElement = screen.getByAltText("test name");

    expect(image).toBeInTheDocument();
    expect(image.src).toContain("test-image");
  });
});
