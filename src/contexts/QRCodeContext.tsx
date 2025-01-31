import { createContext, ReactNode, useState } from "react";

export type TQRCodeContext = {
  qrcode: string;
  setQRCode: React.Dispatch<React.SetStateAction<string>>;
};

export const INITIAL_QRCODE = "./placeholder-qrcode.png";

const QRCodeContext = createContext({} as TQRCodeContext);

export function QRCodeProvider({ children }: { children: ReactNode }) {
  const [qrcode, setQRCode] = useState(INITIAL_QRCODE);

  return (
    <QRCodeContext value={{ qrcode, setQRCode }}>{children}</QRCodeContext>
  );
}

export default QRCodeContext;
