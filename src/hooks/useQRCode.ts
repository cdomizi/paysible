import QRCodeContext, {
  INITIAL_QRCODE,
  TQRCodeContext,
} from "@/contexts/QRCodeContext";
import { useContext } from "react";

export function isInitialQRCode(currentQRCode: TQRCodeContext["qrcode"]) {
  return currentQRCode === INITIAL_QRCODE;
}

export function useQRCode() {
  const { qrcode, setQRCode } = useContext(QRCodeContext);

  const qrcodeElement = document.querySelector("#qrcode");

  function updateQRCode(newQRCode: string) {
    setQRCode(newQRCode);

    // Scroll to new QR code on form submission
    qrcodeElement?.scrollIntoView();
  }

  return { qrcode, setQRCode: updateQRCode };
}
