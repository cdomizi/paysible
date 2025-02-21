import { QRCodeProvider } from "@contexts/QRCodeContext";
import { act, renderHook } from "@testing-library/react";
import { isInitialQRCode, scrollToQRCode, useQRCode } from "../useQRCode";

const matchingPath = "./placeholder-qrcode.png";
const nonMatchingPath = "mock/non-matching/file/path.png";

describe("isInitialQRCode", () => {
  test("returns true on matching file path", () => {
    const result = isInitialQRCode(matchingPath);

    expect(result).toBe(true);
  });

  test("returns false on non-matching file path", () => {
    const result = isInitialQRCode(nonMatchingPath);

    expect(result).toBe(false);
  });
});

describe("scrollToQRCode", () => {
  test("calls scrollIntoView()", () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView =
      scrollIntoViewMock() as typeof Element.prototype.scrollIntoView;

    scrollToQRCode();

    expect(scrollIntoViewMock).toHaveBeenCalledOnce();
  });
});

describe("useQRCode", () => {
  test("throws error when used outside the context provider", () => {
    expect(() => useQRCode()).toThrow();
  });
  test("updated QRCodeContext value", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QRCodeProvider>{children}</QRCodeProvider>
    );
    const newQRCodeValue = "New QR code value";

    const { result } = renderHook(() => useQRCode(), { wrapper });

    expect(result.current.qrcode).toBe(matchingPath);

    act(() => {
      result.current.setQRCode(newQRCodeValue);
    });

    expect(result.current.qrcode).toBe(newQRCodeValue);
  });
});
