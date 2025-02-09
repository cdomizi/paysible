import { QRCodeProvider } from "@/contexts/QRCodeContext";
import * as useQRCode from "@/hooks/useQRCode";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GeneratorForm } from "../GeneratorForm";
import * as generatorFormService from "../GeneratorFormService";

// Mock useQRCode hook
const setQRCodeSpy = vi.fn();

beforeEach(() => {
  vi.spyOn(useQRCode, "useQRCode").mockReturnValue({
    qrcode: "mock value",
    setQRCode: setQRCodeSpy,
  });
});

describe.only("GeneratorForm", () => {
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
        name: /^name of the beneficiary$/i,
      });
      const errorHelperText = /^please enter the full name$/i;
      const submitButton = screen.getByRole("button", { name: /^generate$/i });

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

      // Delete some characters from the beneficiary field to trigger the error again
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
        name: /^name of the beneficiary$/i,
      });
      const errorHelperText = /^name too long: max 70 ch.$/i;
      const submitButton = screen.getByRole("button", { name: /^generate$/i });
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
    test("validates IBAN field correctly", async () => {
      const user = userEvent.setup();
      const validIBAN = "IE29AIBK93115212345678";

      render(<GeneratorForm />);

      const ibanField = screen.getByRole("textbox", {
        name: /^iban$/i,
      });
      const errorHelperText = /^please enter a valid iban$/i;
      const submitButton = screen.getByRole("button", { name: /generate/i });

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(ibanField).not.toHaveClass("border-error");

      // Fill beneficiary field to prevent focus on error submit
      await user.type(
        screen.getByRole("textbox", { name: /^name of the beneficiary$/i }),
        "Jane Doe",
      );

      // Enter invalid input in the IBAN field
      await user.type(ibanField, validIBAN.slice(0, 2));

      // Submit the form with invalid input
      await user.click(submitButton);

      // Expected error on IBAN field
      expect(ibanField).toHaveValue("IE");
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(ibanField).toHaveFocus();
      expect(ibanField).toHaveClass("border-error");

      // Enter valid input in the IBAN field
      await user.type(ibanField, validIBAN.slice(2));

      // Error disappeared on IBAN field
      expect(ibanField).toHaveValue(validIBAN);
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(ibanField).not.toHaveClass("border-error");

      // Delete some characters from the IBAN field to trigger the error again
      await user.type(ibanField, "{backspace}{backspace}");

      // UI displays error again
      expect(ibanField).toHaveValue(validIBAN.slice(0, -2));
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(ibanField).toHaveFocus();
      expect(ibanField).toHaveClass("border-error");
    });
  });

  describe("amount form field", () => {
    test("validates amount field correctly", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const amountField = screen.getByRole("spinbutton", {
        name: /^amount/i,
      });
      const errorHelperText = /^please enter at least € 0.01$/i;
      const submitButton = screen.getByRole("button", { name: /generate/i });

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");

      // Fill beneficiary & IBAN fields to prevent focus on error submit
      await user.type(
        screen.getByRole("textbox", { name: /^name of the beneficiary$/i }),
        "Jane Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /^iban$/i }),
        "IE29AIBK93115212345678",
      );

      // Enter invalid input in the amount field
      await user.type(amountField, "invalid input");

      // Submit the form with invalid input
      await user.click(submitButton);

      // Expected error on amount field
      expect(amountField).toHaveValue(null);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(amountField).toHaveFocus();
      expect(amountField).toHaveClass("border-error");

      // Enter valid input in the amount field
      await user.type(amountField, "10");

      // Error disappeared on amount field
      expect(amountField).toHaveValue(10);
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");

      // Delete some characters from the amount field to trigger the error again
      await user.type(amountField, "{backspace}{backspace}");

      // UI displays error again
      expect(amountField).toHaveValue(null);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(amountField).toHaveFocus();
      expect(amountField).toHaveClass("border-error");
    });

    test("shows error on amount too little", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const amountField = screen.getByRole("spinbutton", {
        name: /^amount/i,
      });
      const errorHelperText = /^please enter at least € 0.01$/i;
      const submitButton = screen.getByRole("button", { name: /generate/i });

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");

      // Fill beneficiary & IBAN fields to prevent focus on error submit
      await user.type(
        screen.getByRole("textbox", { name: /^name of the beneficiary$/i }),
        "Jane Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /^iban$/i }),
        "IE29AIBK93115212345678",
      );

      // Enter invalid input in the amount field
      await user.type(amountField, "0");

      // Submit the form with invalid input
      await user.click(submitButton);

      // Expected error on amount field
      expect(amountField).toHaveValue(0);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(amountField).toHaveFocus();
      expect(amountField).toHaveClass("border-error");

      // Enter valid input in the amount field
      await user.type(amountField, "10");

      // Error disappeared on amount field
      expect(amountField).toHaveValue(10);
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");
    });

    test("shows error on amount too large", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const amountField = screen.getByRole("spinbutton", {
        name: /^amount/i,
      });
      const errorHelperText = /^Amount shall not be € 1 bn\+$/i;
      const submitButton = screen.getByRole("button", { name: /generate/i });

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");

      // Fill beneficiary & IBAN fields to prevent focus on error submit
      await user.type(
        screen.getByRole("textbox", { name: /^name of the beneficiary$/i }),
        "Jane Doe",
      );
      await user.type(
        screen.getByRole("textbox", { name: /^iban$/i }),
        "IE29AIBK93115212345678",
      );

      // Enter invalid input in the amount field
      await user.type(amountField, "1000000000");

      // Submit the form with invalid input
      await user.click(submitButton);

      // Expected error on amount field
      expect(amountField).toHaveValue(1000000000);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(amountField).toHaveFocus();
      expect(amountField).toHaveClass("border-error");

      // Enter valid input in the amount field
      await user.type(amountField, "{backspace}{backspace}");

      // Error disappeared on amount field
      expect(amountField).toHaveValue(10000000);
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(amountField).not.toHaveClass("border-error");
    });
  });

  describe("remittance form field", () => {
    test("shows error on input too long", async () => {
      const user = userEvent.setup();

      render(<GeneratorForm />);

      const remittanceField = screen.getByRole("textbox", {
        name: /^note/i,
      });
      const errorHelperText = /^note too long: max 140 ch.$/i;
      const submitButton = screen.getByRole("button", { name: /^generate$/i });
      const tooLongInput =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt cum voluptatem perspiciatis unde voluptates optio minus? Non quae iste nam.";

      // UI clean state - no error displayed initially
      expect(() => screen.getByText(errorHelperText)).toThrow();
      expect(remittanceField).not.toHaveClass("border-error");

      // Enter too many characters in the remittance field
      await user.type(remittanceField, tooLongInput);

      // Submit the form with too long input
      await user.click(submitButton);

      // Expected error on remittance field
      expect(remittanceField).toHaveValue(tooLongInput);
      expect(screen.getByText(errorHelperText)).toBeInTheDocument();
      expect(remittanceField).toHaveClass("border-error");
    });
  });

  test("submits form when submit button is clicked", async () => {
    const user = userEvent.setup();

    render(<GeneratorForm />);

    const beneficiaryField = screen.getByRole("textbox", {
      name: /^name of the beneficiary$/i,
    });
    const ibanField = screen.getByRole("textbox", { name: /^iban$/i });
    const amountField = screen.getByRole("spinbutton", {
      name: /^amount \(€\)$/i,
    });
    const remittanceField = screen.getByRole("textbox", { name: /^note/i });
    const submitButton = screen.getByRole("button", { name: /^generate$/i });

    // Fill form fields correctly
    await user.type(beneficiaryField, "Jane Doe");
    await user.type(ibanField, "IE29AIBK93115212345678");
    await user.type(amountField, "10");
    await user.type(remittanceField, "Gas ⛽");

    await user.click(submitButton); // Submit the form

    // No errors displayed
    expect(beneficiaryField).not.toHaveClass("border-error");
    expect(ibanField).not.toHaveClass("border-error");
    expect(amountField).not.toHaveClass("border-error");
    expect(remittanceField).not.toHaveClass("border-error");
  });

  test("updates qrcode context value on successful submit", async () => {
    const user = userEvent.setup();

    // Mock generateQRCodeFromPayload
    const mockFormPayload = "QR code payload";
    const generateQRCodeFromPayloadSpy = vi
      .spyOn(generatorFormService, "generateQRCodeFromPayload")
      .mockImplementation(vi.fn().mockResolvedValue(mockFormPayload));

    const qrcodeContextWrapper = ({
      children,
    }: {
      children: React.ReactNode;
    }) => <QRCodeProvider>{children}</QRCodeProvider>;

    render(<GeneratorForm />, { wrapper: qrcodeContextWrapper });

    const beneficiaryField = screen.getByRole("textbox", {
      name: /^name of the beneficiary$/i,
    });
    const ibanField = screen.getByRole("textbox", { name: /^iban$/i });
    const amountField = screen.getByRole("spinbutton", {
      name: /^amount \(€\)$/i,
    });
    const remittanceField = screen.getByRole("textbox", { name: /^note/i });
    const submitButton = screen.getByRole("button", { name: /^generate$/i });

    // Fill form fields correctly
    await user.type(beneficiaryField, "Jane Doe");
    await user.type(ibanField, "IE29AIBK93115212345678");
    await user.type(amountField, "10");
    await user.type(remittanceField, "Gas ⛽");

    await user.click(submitButton); // Submit the form

    expect(generateQRCodeFromPayloadSpy).toHaveBeenCalledOnce(); // Called by onSubmit
    expect(generateQRCodeFromPayloadSpy).toHaveResolvedWith(mockFormPayload);
    // Updates context value on form submit
    expect(setQRCodeSpy).toHaveBeenCalledWith(mockFormPayload);
  });

  test("resets form fields when clear button is clicked", async () => {
    const user = userEvent.setup();

    render(<GeneratorForm />);

    const beneficiaryField = screen.getByRole("textbox", {
      name: /^name of the beneficiary$/i,
    });
    const beneficiaryFieldValue = "Jane Doe";
    const ibanField = screen.getByRole("textbox", { name: /^iban$/i });
    const ibanFieldValue = "IE29AIBK93115212345678";
    const amountField = screen.getByRole("spinbutton", {
      name: /^amount \(€\)$/i,
    });
    const amountFieldValue = 10;
    const remittanceField = screen.getByRole("textbox", { name: /^note/i });
    const remittanceFieldValue = "Gas ⛽";
    const resetButton = screen.getByRole("button", { name: /^clear$/i });

    // Fill form fields correctly
    await user.type(beneficiaryField, beneficiaryFieldValue);
    await user.type(ibanField, ibanFieldValue);
    await user.type(amountField, amountFieldValue.toString());
    await user.type(remittanceField, remittanceFieldValue);

    // Form fields are filled
    expect(beneficiaryField).toHaveValue(beneficiaryFieldValue);
    expect(ibanField).toHaveValue(ibanFieldValue);
    expect(amountField).toHaveValue(amountFieldValue);
    expect(remittanceField).toHaveValue(remittanceFieldValue);

    await user.click(resetButton); // Reset the form

    // Form fields are empty
    expect(beneficiaryField).not.toHaveValue(beneficiaryFieldValue);
    expect(ibanField).not.toHaveValue(ibanFieldValue);
    expect(amountField).not.toHaveValue(amountFieldValue);
    expect(remittanceField).not.toHaveValue(remittanceFieldValue);
  });
});
