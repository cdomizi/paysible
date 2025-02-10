import { INITIAL_QRCODE } from "@/contexts/QRCodeContext";
import * as useQRCode from "@/hooks/useQRCode";
import { logRoles, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { QRCode } from "../QRCode";
import { CTA, CTA_DESCRIPTION } from "../QRCodeService";

describe("QRCode", () => {
  beforeEach(() => {
    vi.spyOn(useQRCode, "useQRCode").mockReturnValue({
      qrcode: INITIAL_QRCODE,
      setQRCode: vi.fn(),
    });
  });

  test("component renders correctly", () => {
    render(<QRCode />);

    const initialCTA = screen.getByRole("heading");
    const initialCTADescription = screen.getByText(CTA_DESCRIPTION.INITIAL);
    const qrcodeImg = screen.getByRole("img");

    logRoles(document.querySelector("#qrcode-container")!);

    expect(initialCTA).toBeInTheDocument();
    expect(initialCTA).toHaveTextContent(CTA.INITIAL);
    expect(initialCTADescription).toBeInTheDocument();
    expect(qrcodeImg).toBeInTheDocument();
    expect(qrcodeImg).toHaveAttribute("src", INITIAL_QRCODE);
  });
});
