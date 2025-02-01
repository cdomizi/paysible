import QRCodeContext, {
  INITIAL_QRCODE,
  TQRCodeContext,
} from "@/contexts/QRCodeContext";
import { useContext } from "react";

export function isInitialQRCode(currentQRCode: TQRCodeContext["qrcode"]) {
  return currentQRCode === INITIAL_QRCODE;
}

export function scrollToQRCode() {
  const qrcodeElement = document.querySelector("#qrcode");

  qrcodeElement?.scrollIntoView();
}

export function useQRCode() {
  const { qrcode, setQRCode } = useContext(QRCodeContext);

  function updateQRCode(newQRCode: string) {
    setQRCode(newQRCode);

    // Scroll to new QR code on form submission
    scrollToQRCode();
  }

  return { qrcode, setQRCode: updateQRCode };
}
