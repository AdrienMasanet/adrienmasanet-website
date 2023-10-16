import "@testing-library/jest-dom";

import { act,render, screen } from "@testing-library/react";

import { LoadingCompleteContext } from "../../context/LoadingCompleteContext";
import ClientDelayedLoader from "./ClientDelayedLoader";

describe("ClientDelayedLoader component", () => {
  it("should be visible while the app has not finished loading", () => {
    render(<ClientDelayedLoader />);

    const loader = screen.getByTestId("loader");

    expect(loader).toHaveStyle("opacity: 1");
    expect(loader).toBeVisible();
  });

  it("should be removed from the dom after passed transitionDelay value in milliseconds elapsed when the app has finished loading", () => {
    const { rerender } = render(
      <LoadingCompleteContext.Provider
        value={{ loadingComplete: false, setLoadingComplete: () => {} }}
      >
        <ClientDelayedLoader transitionDelay={3000} />
      </LoadingCompleteContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    rerender(
      <LoadingCompleteContext.Provider
        value={{ loadingComplete: true, setLoadingComplete: () => {} }}
      >
        <ClientDelayedLoader transitionDelay={3000} />
      </LoadingCompleteContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(3001);
    });

    const loader = screen.queryByTestId("loader");
    expect(loader).not.toBeInTheDocument();
  });

  it("should clear timer when component rerenders", () => {
    const { rerender } = render(
      <LoadingCompleteContext.Provider
        value={{ loadingComplete: true, setLoadingComplete: () => {} }}
      >
        <ClientDelayedLoader transitionDelay={3000} />
      </LoadingCompleteContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    rerender(
      <LoadingCompleteContext.Provider
        value={{ loadingComplete: false, setLoadingComplete: () => {} }}
      >
        <ClientDelayedLoader transitionDelay={3000} />
      </LoadingCompleteContext.Provider>
    );

    act(() => {
      jest.advanceTimersByTime(1001);
    });

    const loader = screen.queryByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
});
