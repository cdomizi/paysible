import {
  boolToIdentificationValues,
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

  describe.todo("formatAmount", () => {
    test.todo("throws error on invalid input", () => {
      // todo
    });
    test.todo("outputs a string", () => {
      // todo
    });
    test.todo("adds prefix to input", () => {
      // todo
    });
    test.todo("rounds number to two decimal places", () => {
      // todo
    });
    test.todo("rounds to upper number", () => {
      // todo
    });
    test.todo("rounds to lower number", () => {
      // todo
    });
  });

  describe("boolToIdentificationValues", () => {
    test("converts `true` value to 'INST'", () => {
      expect(boolToIdentificationValues(true)).toBe("INST");
    });
    test.todo("converts `false` to 'SCT'", () => {
      expect(boolToIdentificationValues(false)).toBe("SCT");
    });
  });
});
