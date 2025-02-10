import { useQRCode } from "@hooks/useQRCode";
import { getCTA, getCTADescription } from "./QRCodeService";

export function QRCode() {
  const { qrcode } = useQRCode();

  const callToAction = getCTA(qrcode);
  const ctaDescription = getCTADescription(qrcode);

  return (
    <div
      id="qrcode-container"
      className="border-1 card m-auto my-12 max-w-80 shadow-xl md:m-0"
    >
      <figure className="px-10 pt-10">
        <img
          id="qrcode"
          src={qrcode}
          alt="QR code - Scan to perform SEPA transfer"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 id="qrcode-cta" className="card-title">
          {callToAction}
        </h2>
        <p id="qrcode-cta-description">{ctaDescription}</p>
      </div>
    </div>
  );
}
