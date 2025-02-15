import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

describe("Footer", () => {
  test("component renders correctly", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const mainCopyrightNotice = screen.getByText(
      /^Copyright © 202[0-9]{1} - All rights reserved$/,
    );
    const secondaryCopyrightNotice = screen.getByText(
      /^"QR Code" is a registered trademark of DENSO WAVE INCORPORATED$/,
    );

    expect(footer).toBeInTheDocument();
    expect(mainCopyrightNotice).toBeInTheDocument();
    expect(secondaryCopyrightNotice).toBeInTheDocument();
  });
});
