import { act, render, screen } from "@testing-library/react";

import SocialMediaIcon from "./SocialMediaIcon";

describe("SocialMediaIcon component", () => {
  it("should render the passed icon", () => {
    render(
      <SocialMediaIcon
        name="test name"
        icon="http://test-icon"
        link="test link"
      />
    );

    const icon: HTMLImageElement = screen.getByAltText(
      "Icône du réseau social test name"
    );

    expect(icon).toBeInTheDocument();
    expect(icon.src).toContain("test-icon");
  });

  it("should render the link with the correct href", () => {
    render(
      <SocialMediaIcon
        name="test name"
        icon="http://test-icon"
        link="test link"
      />
    );

    expect(screen.getByRole("link")).toHaveAttribute("href", "test link");
  });
});
