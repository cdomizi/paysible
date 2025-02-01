import { scrollToQRCode } from "../useQRCode";

describe("useQRCode", () => {
  test("scrollToQRCode", () => {
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView =
      scrollIntoViewMock() as typeof Element.prototype.scrollIntoView;

    scrollToQRCode();

    expect(scrollIntoViewMock).toHaveBeenCalledOnce();
  });
});
