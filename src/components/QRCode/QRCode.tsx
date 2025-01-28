import { useQRCode } from "@/hooks/useQRCode";

export function QRCode() {
  const { qrcode } = useQRCode();
  return (
    <div
      id="qrcode-container"
      className="border-1 card mx-auto my-12 w-80 shadow-xl"
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
        <h2 className="card-title">Scan and Pay!</h2>
        <p>
          Use your mobile banking app to scan the code and perform the payment
          👌
        </p>
      </div>
    </div>
  );
}
