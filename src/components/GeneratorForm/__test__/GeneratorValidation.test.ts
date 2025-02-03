import {
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

      expect(ibanSchema.safeParse("").error?.issues[0].message).toBe(
        expectedErrorMessage,
      );
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
