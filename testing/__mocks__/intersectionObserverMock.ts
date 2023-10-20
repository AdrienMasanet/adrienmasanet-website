jest.mock("react-intersection-observer", () => ({
  useInView: () => ({ ref: null, inView: true }),
}));

export {};
