import {
  beneficiarySchema,
  boolToIdentificationValues,
  formatAmount,
  ibanSchema,
  removeWhiteSpace,
} from "../GeneratorFormValidation";

describe("GeneratorValidation", () => {
  describe("removeWhiteSpace", () => {
    test("throws error on invalid input", () => {
      const invalidInput = null;

      // @ts-expect-error: Expects argument of type string
      expect(() => removeWhiteSpace(invalidInput)).toThrow();
    });
    test("returns an empty string when input is an empty string", () => {
      expect(removeWhiteSpace("")).toBe("");
    });
    test("returns the same string if it contains no whitespace", () => {
      expect(removeWhiteSpace("NoWhitespace")).toBe("NoWhitespace");
    });
    test("removes leading, trailing and inner spaces", () => {
      expect(removeWhiteSpace("     HelloWorld   ")).toBe("HelloWorld");
      expect(removeWhiteSpace("Hello World")).toBe("HelloWorld");
      expect(removeWhiteSpace("     Hello World   ")).toBe("HelloWorld");
    });
    test("removes all whitespace characters from the string", () => {
      expect(removeWhiteSpace("\nNew\nLine\n")).toBe("NewLine");
      expect(removeWhiteSpace("\tTab\tSpace\t")).toBe("TabSpace");
      expect(removeWhiteSpace("Hello \n\t World")).toBe("HelloWorld");
    });
  });

  describe("IBAN validation", () => {
    test("throws error on empty string", () => {
      const expectedErrorMessage = "Please enter a valid IBAN";

      expect(() => ibanSchema.parse("")).toThrow(expectedErrorMessage);
    });

    test("throws error on input of wrong type", () => {
      const expectedErrorMesssage = "Please enter a valid IBAN";

      expect(() => ibanSchema.parse(Symbol("Wrong type"))).toThrow(
        expectedErrorMesssage,
      );
    });

    test("converts input string to uppercase", () => {
      const lowercaseIBAN = "ie29aibK93115212345678";
      const expectedResult = "IE29AIBK93115212345678";

      expect(ibanSchema.parse(lowercaseIBAN)).toBe(expectedResult);
    });

    test("removes white spaces", () => {
      const ibanWithSpaces = "IE29 AIBK 9311 5212 3456 78";
      const expectedResult = "IE29AIBK93115212345678";

      expect(ibanSchema.parse(ibanWithSpaces)).toBe(expectedResult);
    });

    test("throws error on valid IBAN from no-SEPA country", () => {
      const nonSepaIban = "KZ938177167571892266";
      const expectedErrorMessage = "Please enter a valid IBAN";

      expect(() => ibanSchema.parse(nonSepaIban)).toThrow(expectedErrorMessage);
    });

    test("throws error on invalid IBAN from SEPA country", () => {
      const invalidSepaIban = "IE29AIBK9311521234567";
      const expectedErrorMessage = "Please enter a valid IBAN";

      expect(() => ibanSchema.parse(invalidSepaIban)).toThrow(
        expectedErrorMessage,
      );
    });

    test("returns valid IBAN from SEPA country", () => {
      const validSepaIban = "IE29AIBK93115212345678";
      const expectedResult = validSepaIban;

      expect(ibanSchema.parse(validSepaIban)).toBe(expectedResult);
    });
  });

  describe("Beneficiary name validation", () => {
    test("throws error on input of wrong type", () => {
      const expectedErrorMesssage = "Please enter a valid name";

      expect(() => beneficiarySchema.parse(Symbol("Wrong type"))).toThrow(
        expectedErrorMesssage,
      );
    });

    test("throws error on empty string", () => {
      const expectedErrorMessage = "Please enter the full name";

      expect(() => beneficiarySchema.parse("")).toThrow(expectedErrorMessage);
    });

    test("throws error on input not matching regex", () => {
      const notValidName = "A B";
      const expectedErrorMessage = "Please enter the full name";

      expect(() => beneficiarySchema.parse(notValidName)).toThrow(
        expectedErrorMessage,
      );
    });

    test("throws error on maximum length exceeded", () => {
      const tooLongName =
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, molestiae.";
      const expectedErrorMessage = "Name too long: max 70 ch.";

      expect(() => beneficiarySchema.parse(tooLongName)).toThrow(
        expectedErrorMessage,
      );
    });

    test("removes leading and trailing spaces", () => {
      const trimmedName = "John Doe";
      const notTrimmedName = `     ${trimmedName}   `;

      expect(beneficiarySchema.parse(notTrimmedName)).toBe(trimmedName);
    });
  });

  describe("formatAmount", () => {
    test("throws error on invalid input", () => {
      const invalidInput = Symbol("invalid");

      // @ts-expect-error: Expects argument of type string
      expect(() => formatAmount(invalidInput)).toThrow();
    });
    test("formats an amount with no decimal places correctly", () => {
      expect(formatAmount(1234)).toBe("EUR1234.00");
    });
    test("rounds number to two decimal places", () => {
      expect(formatAmount(0.00001)).toBe("EUR0.00");
    });
    test("handles trailing zeroes correctly", () => {
      expect(formatAmount(1234.0)).toBe("EUR1234.00");
    });
    test("rounds to upper number", () => {
      expect(formatAmount(0.004)).toBe("EUR0.00");
    });
    test("rounds to lower number", () => {
      expect(formatAmount(0.005)).toBe("EUR0.01");
    });
  });

  describe("boolToIdentificationValues", () => {
    test("converts `true` value to 'INST'", () => {
      expect(boolToIdentificationValues(true)).toBe("INST");
    });
    test("converts `false` to 'SCT'", () => {
      expect(boolToIdentificationValues(false)).toBe("SCT");
    });
  });
});
