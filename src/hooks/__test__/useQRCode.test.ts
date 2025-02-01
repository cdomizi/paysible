import { isInitialQRCode, scrollToQRCode } from "../useQRCode";

const mocks = vi.hoisted(() => ({
  INITIAL_QRCODE: "mock/matching/file/path.png",
}));

vi.mock("@contexts/QRCodeContext", () => ({
  INITIAL_QRCODE: mocks.INITIAL_QRCODE,
}));

describe("useQRCode", () => {
  describe("isInitialQRCode", () => {
    test("returns true on matching file path", () => {
      const matchingPath = "mock/matching/file/path.png";

      const result = isInitialQRCode(matchingPath);

      expect(result).toBe(true);
    });

    test("returns false on non-matching file path", () => {
      const nonMatchingPath = "mock/non-matching/file/path.png";

      const result = isInitialQRCode(nonMatchingPath);

      expect(result).toBe(false);
    });
  });

  describe("scrollIntoView", () => {
    test("calls scrollIntoView()", () => {
      const scrollIntoViewMock = vi.fn();
      Element.prototype.scrollIntoView =
        scrollIntoViewMock() as typeof Element.prototype.scrollIntoView;

      scrollToQRCode();

      expect(scrollIntoViewMock).toHaveBeenCalledOnce();
    });
  });
});
