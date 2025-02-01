import { isInitialQRCode, useQRCode } from "@hooks/useQRCode";

export function QRCode() {
  const { qrcode } = useQRCode();

  const CTA = {
    INITIAL: "Create a new QR Code",
    SUCCESS: "Scan & Pay!",
  } as const;

  const CTA_DESCRIPTION = {
    INITIAL: "Enter your payment data to generate a new code ✨",
    SUCCESS:
      "Use your mobile banking app to scan the code and make the payment 👌",
  } as const;

  // Change call to action/description on QR code generation
  const callToAction = isInitialQRCode(qrcode) ? CTA.INITIAL : CTA.SUCCESS;
  const ctaDescription = isInitialQRCode(qrcode)
    ? CTA_DESCRIPTION.INITIAL
    : CTA_DESCRIPTION.SUCCESS;

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
        <h2 className="card-title">{callToAction}</h2>
        <p>{ctaDescription}</p>
      </div>
    </div>
  );
}
