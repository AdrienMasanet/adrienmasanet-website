jest.mock("next-recaptcha-v3", () => ({
  useReCaptcha: () => ({ executeRecaptcha: () => {} }),
}));

export {};
