import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GeneratorForm } from "../GeneratorForm";

describe("GeneratorForm", () => {
  test("component renders correctly", () => {
    render(<GeneratorForm />);

    const title = screen.getByRole("heading");
    const beneficiaryField = screen.getByRole("textbox", {
      name: /^name of the beneficiary$/i,
    });
    const ibanField = screen.getByRole("textbox", { name: /^iban$/i });
    const amountField = screen.getByRole("spinbutton", {
      name: /^amount \(€\)$/i,
    });
    const remittanceField = screen.getByRole("textbox", { name: /^note/i });
    const identificationField = screen.getByRole("checkbox", {
      name: /^identification$/i,
    });
    const resetButton = screen.getByRole("button", { name: /^clear$/i });
    const submitButton = screen.getByRole("button", { name: /^generate$/i });

    expect(title).toHaveTextContent(/^new payment code$/i);
    expect(beneficiaryField).toBeInTheDocument();
    expect(ibanField).toBeInTheDocument();
    expect(amountField).toBeInTheDocument();
    expect(remittanceField).toBeInTheDocument();
    expect(identificationField).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("shows error on missing required field", async () => {
    const user = userEvent.setup();

    render(<GeneratorForm />);

    const beneficiaryField = screen.getByRole("textbox", {
      name: /^name of the beneficiary$/i,
    });
    const beneficiaryErrorHelperText = /^please enter the full name$/i;
    const ibanField = screen.getByRole("textbox", { name: /^iban$/i });
    const ibanErrorHelperText = /^please enter a valid iban$/i;
    const amountField = screen.getByRole("spinbutton", {
      name: /^amount \(€\)$/i,
    });
    const amountErrorHelperText = /^please enter at least € 0.01$/i;
    const remittanceField = screen.getByRole("textbox", { name: /^note/i });
    const submitButton = screen.getByRole("button", { name: /^generate$/i });

    // UI clean state - no error displayed initially
    expect(() => screen.getByText(beneficiaryErrorHelperText)).toThrow();
    expect(() => screen.getByText(ibanErrorHelperText)).toThrow();
    expect(() => screen.getByText(amountErrorHelperText)).toThrow();
    expect(beneficiaryField).not.toHaveClass("border-error");
    expect(ibanField).not.toHaveClass("border-error");
    expect(amountField).not.toHaveClass("border-error");
    expect(remittanceField).not.toHaveClass("border-error");

    // Submit the form with empty required field
    await user.click(submitButton);

    // Required fields show error
    expect(screen.getByText(beneficiaryErrorHelperText)).toBeInTheDocument();
    expect(beneficiaryField).toHaveClass("border-error");
    expect(beneficiaryField).toHaveFocus(); // Focus on first field with error
    expect(screen.getByText(ibanErrorHelperText)).toBeInTheDocument();
    expect(ibanField).toHaveClass("border-error");
    expect(screen.getByText(amountErrorHelperText)).toBeInTheDocument();
    expect(amountField).toHaveClass("border-error");
    // No error on optional field
    expect(remittanceField).not.toHaveClass("border-error");
  });

  describe("beneficiary form field", () => {
    test("validates name field correctly", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const beneficiaryField = screen.getByRole("textbox", {
        name: /name of the beneficiary/i,
      });
      const errorHelperText = /^please enter the full name$/i;
      const submitButton = screen.getByRole("button", { name: /generate/i });

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(beneficiaryField).not.toHaveClass("border-error");

      // Enter four characters in the beneficiary field
      await user.type(beneficiaryField, "Jane");

      // Submit the form with invalid input
      await user.click(submitButton);

      // Expected error on beneficiary field
      expect(beneficiaryField).toHaveValue("Jane");
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(beneficiaryField).toHaveFocus();
      expect(beneficiaryField).toHaveClass("border-error");

      // Enter valid input in the beneficiary field
      await user.type(beneficiaryField, " Doe");

      // Error disappeared on beneficiary field
      expect(beneficiaryField).toHaveValue("Jane Doe");
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(beneficiaryField).not.toHaveClass("border-error");

      // Delete some characters from the required field to trigger the error again
      await user.type(beneficiaryField, "{backspace}{backspace}");

      // UI displays error again
      expect(beneficiaryField).toHaveValue("Jane D");
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(beneficiaryField).toHaveFocus();
      expect(beneficiaryField).toHaveClass("border-error");
    });

    test("shows error on input too long", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const beneficiaryField = screen.getByRole("textbox", {
        name: /name of the beneficiary/i,
      });
      const errorHelperText = /name too long: max 70 ch./i;
      const submitButton = screen.getByRole("button", { name: /generate/i });
      const tooLongInput =
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, nesciunt.";

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(beneficiaryField).not.toHaveClass("border-error");

      // Enter too many characters in the beneficiary field
      await user.type(beneficiaryField, tooLongInput);

      // Submit the form with too long input
      await user.click(submitButton);

      // Expected error on beneficiary field
      expect(beneficiaryField).toHaveValue(tooLongInput);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(beneficiaryField).toHaveClass("border-error");
    });
  });

  describe("IBAN form field", () => {
    test.todo("validates IBAN field correctly");
  });

  describe("amount form field", () => {
    test.todo("shows error on missing required field");

    test.todo("validates amount field correctly");

    test.todo("shows error on amount too little");

    test.todo("shows error on amount too large");
  });

  describe("remittance form field", () => {
    test.todo("shows error on input too long");
  });

  test.todo("submits form when submit button is clicked");

  test.todo("resets all form fields when clear button is clicked");
});
