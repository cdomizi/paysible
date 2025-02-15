import { isInitialQRCode } from "@hooks/useQRCode";

export const CTA = {
  INITIAL: "Create a new QR Code",
  SUCCESS: "Scan & Pay!",
} as const;

export const CTA_DESCRIPTION = {
  INITIAL: "Enter your payment data to generate a new code ✨",
  SUCCESS:
    "Use your mobile banking app to scan the code and make the payment 👌",
} as const;

// Change call to action/description on QR code generation
export const getCTA = (qrcode: string) =>
  isInitialQRCode(qrcode) ? CTA.INITIAL : CTA.SUCCESS;
export const getCTADescription = (qrcode: string) =>
  isInitialQRCode(qrcode) ? CTA_DESCRIPTION.INITIAL : CTA_DESCRIPTION.SUCCESS;
