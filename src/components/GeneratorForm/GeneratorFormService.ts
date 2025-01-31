import {
  toDataURL as generateQRCodeDataURL,
  QRCodeToDataURLOptions,
} from "qrcode";
import {
  Amount,
  Beneficiary,
  GeneratorFormOutput,
  Identification,
  Remittance,
  TIban,
} from "./GeneratorFormValidation";

/* ------------------------------ QR Code Info ------------------------------ */
/**
 * 1. Service Tag:           BCD
 * 2. Version:               002
 * 3. Character Set:         1 (UTF-8)
 * 4. Identification:        ... INST (default) / SCT
 * 5. BIC:                   /
 * 6. Name:                  ...
 * 7. IBAN:                  ...
 * 8. Amount:                ... EUR123.45
 * 9. Purpose:               /
 * 10. Remittance (ref.):    /
 * 11. Remittance (text):    ...
 * 12. Information:          /
 */

type TQRcodeData = {
  serviceTag: "BCD";
  version: "002";
  characterSet: "1";
  identification: Identification;
  bic: "";
  name: Beneficiary;
  iban: TIban;
  amount: Amount;
  purpose: "";
  remittanceRef: "";
  remittance: Remittance;
  information: "";
};

export function getQRcodeData(formData: GeneratorFormOutput): TQRcodeData {
  const { beneficiary, iban, amount, identification, remittance } = formData;

  const qrCodeData: TQRcodeData = {
    serviceTag: "BCD",
    version: "002",
    characterSet: "1",
    identification,
    bic: "",
    name: beneficiary,
    iban,
    amount,
    purpose: "",
    remittanceRef: "",
    remittance,
    information: "",
  };

  return qrCodeData;
}

function formatQRcodePayload(qrCodeData: TQRcodeData) {
  const qrCodeDataValues = Object.values(qrCodeData);
  const qrCodePayload = qrCodeDataValues.join("\n");

  return qrCodePayload;
}

function getQRcodePayload(formData: GeneratorFormOutput) {
  const qrCodeData = getQRcodeData(formData); // Get data
  const qrCodePayload = formatQRcodePayload(qrCodeData); // Format data

  return qrCodePayload;
}

const qrcodeGenOptions: QRCodeToDataURLOptions = {
  width: 256,
};

const generateQRCodeImg = async (payload: string) => {
  try {
    const qrCodeImage = await generateQRCodeDataURL(payload, qrcodeGenOptions);

    return qrCodeImage;
  } catch (err) {
    console.error("Error while generating QR code", err);
  }
};

export async function generateQRCodeFromPayload(formData: GeneratorFormOutput) {
  const qrCodePayload = getQRcodePayload(formData);

  const qrcodeImg = await generateQRCodeImg(qrCodePayload);

  return qrcodeImg;
}
