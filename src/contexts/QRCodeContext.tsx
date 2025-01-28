import { createContext, ReactNode, useState } from "react";

type QRCodeContext = {
  qrcode: string;
  setQRCode: React.Dispatch<React.SetStateAction<string>>;
};

const INITIAL_QRCODE = "./placeholder-qrcode.png";

const QRCodeContext = createContext({} as QRCodeContext);

export function QRCodeProvider({ children }: { children: ReactNode }) {
  const [qrcode, setQRCode] = useState(INITIAL_QRCODE);

  return (
    <QRCodeContext value={{ qrcode, setQRCode }}>{children}</QRCodeContext>
  );
}

export default QRCodeContext;
