import "@/testing/__mocks__/reCaptchaMock";

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import * as apiRequests from "../../../../services/apiRequests";
import ContactForm from "./ContactForm";

jest.mock("../../../../services/apiRequests", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../../../services/apiRequests"),
  };
});

describe("ContactForm component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the email input with the correct placeholder", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Adresse e-mail")).toBeInTheDocument();
  });

  it("should render the company input with the correct placeholder", () => {
    render(<ContactForm />);

    expect(
      screen.getByPlaceholderText("Entreprise (facultatif)")
    ).toBeInTheDocument();
  });

  it("should render the message textarea with the correct placeholder", () => {
    render(<ContactForm />);

    expect(
      screen.getByPlaceholderText("Écrivez votre message ici")
    ).toBeInTheDocument();
  });

  it("should render the submit button with the correct type and message", () => {
    render(<ContactForm />);

    const submitButton = screen.getByText("Envoyer");

    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should display success text when user submits the form after completing required fields", async () => {
    const sendContactMessageMock = jest
      .spyOn(apiRequests, "sendContactMessage")
      .mockImplementation(async () => Promise.resolve(true));

    const user = userEvent.setup({ delay: null });
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText("Adresse e-mail");
    await user.type(emailInput, "test@email.com");

    const messageTextarea = screen.getByPlaceholderText(
      "Écrivez votre message ici"
    );
    await user.type(messageTextarea, "This is a test message.");

    expect(emailInput).toHaveValue("test@email.com");
    expect(messageTextarea).toHaveValue("This is a test message.");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(sendContactMessageMock).toHaveBeenCalled();
    expect(
      screen.getByText("Votre message a bien été envoyé ✅")
    ).toBeInTheDocument();
  });

  it("should display error text when user submits the form but the service fails", async () => {
    const sendContactMessageMock = jest
      .spyOn(apiRequests, "sendContactMessage")
      .mockImplementation(async () => Promise.resolve(false));

    const user = userEvent.setup({ delay: null });
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText("Adresse e-mail");
    await user.type(emailInput, "test@email.com");

    const messageTextarea = screen.getByPlaceholderText(
      "Écrivez votre message ici"
    );
    await user.type(messageTextarea, "This is a test message.");

    expect(emailInput).toHaveValue("test@email.com");
    expect(messageTextarea).toHaveValue("This is a test message.");

    const submitButton = screen.getByRole("button");
    await user.click(submitButton);

    expect(sendContactMessageMock).toHaveBeenCalled();
    expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument();
  });
});
