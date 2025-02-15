import { INITIAL_QRCODE } from "@contexts/QRCodeContext";
import * as useQRCode from "@hooks/useQRCode";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { QRCode } from "../QRCode";
import { CTA, CTA_DESCRIPTION } from "../QRCodeService";

const mocks = vi.hoisted(() => {
  return {
    useQRCode: vi.fn(),
  };
});

vi.mock(import("@hooks/useQRCode"), async (importOriginal) => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    useQRCode: mocks.useQRCode,
  };
});

describe("QRCode", () => {
  test("component renders correctly", () => {
    vi.mocked(useQRCode.useQRCode).mockReturnValue({
      qrcode: INITIAL_QRCODE,
      setQRCode: vi.fn(),
    });
    render(<QRCode />);

    const initialCTA = screen.getByRole("heading");
    const initialCTADescription = screen.getByText(CTA_DESCRIPTION.INITIAL);
    const qrcodeImg = screen.getByRole("img");

    expect(initialCTA).toBeInTheDocument();
    expect(initialCTA).toHaveTextContent(CTA.INITIAL);
    expect(initialCTADescription).toBeInTheDocument();
    expect(qrcodeImg).toBeInTheDocument();
    expect(qrcodeImg).toHaveAttribute("src", INITIAL_QRCODE);
  });

  test("displays new QR code on context update", () => {
    vi.mocked(useQRCode.useQRCode).mockReturnValueOnce({
      qrcode: INITIAL_QRCODE,
      setQRCode: vi.fn(),
    });

    const { rerender } = render(<QRCode />);

    const initialCTA = screen.getByRole("heading");
    const initialCTADescription = screen.getByText(CTA_DESCRIPTION.INITIAL);
    const qrcodeImg = screen.getByRole("img");

    // Initial state: display default values
    expect(initialCTA).toBeInTheDocument();
    expect(initialCTA).toHaveTextContent(CTA.INITIAL);
    expect(initialCTADescription).toBeInTheDocument();
    expect(qrcodeImg).toBeInTheDocument();
    expect(qrcodeImg).toHaveAttribute("src", INITIAL_QRCODE);

    // QRCodeContext update
    const newQRCodeValue = "New QR code";
    vi.mocked(useQRCode.useQRCode).mockReturnValueOnce({
      qrcode: newQRCodeValue,
      setQRCode: vi.fn(),
    });

    rerender(<QRCode />);

    const updatedCTADescription = screen.getByText(CTA_DESCRIPTION.SUCCESS);

    expect(initialCTA).toHaveTextContent(CTA.SUCCESS);
    expect(updatedCTADescription).toBeInTheDocument();
    expect(qrcodeImg).toHaveAttribute("src", newQRCodeValue);
  });
});
