import {
  toDataURL as generateQRCodeDataURL,
  QRCodeToDataURLOptions,
} from "qrcode";
import {
  TAmount,
  TBeneficiary,
  TGeneratorFormOutput,
  TIban,
  TIdentification,
  TRemittance,
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

export type TQRCodeData = {
  serviceTag: "BCD";
  version: "002";
  characterSet: "1";
  identification: TIdentification;
  bic: "";
  name: TBeneficiary;
  iban: TIban;
  amount: TAmount;
  purpose: "";
  remittanceRef: "";
  remittance: TRemittance;
  information: "";
};

function getQRCodeData(formData: TGeneratorFormOutput): TQRCodeData {
  const { beneficiary, iban, amount, identification, remittance } = formData;

  const qrCodeData: TQRCodeData = {
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

function formatQRCodePayload(qrCodeData: TQRCodeData) {
  const qrCodeDataValues = Object.values(qrCodeData);
  const qrCodePayload = qrCodeDataValues.join("\n");

  return qrCodePayload;
}

export function getQRCodePayload(formData: TGeneratorFormOutput) {
  const qrCodeData = getQRCodeData(formData); // Get data
  const qrCodePayload = formatQRCodePayload(qrCodeData); // Format data

  return qrCodePayload;
}

const qrcodeDefaultGenOptions: QRCodeToDataURLOptions = {
  width: 256,
};

async function generateQRCodeImg(payload: string) {
  try {
    const qrCodeImage = await generateQRCodeDataURL(
      payload,
      qrcodeDefaultGenOptions,
    );

    return qrCodeImage;
  } catch (err) {
    console.error("Error while generating QR code", err);
  }
}

export async function generateQRCodeFromPayload(
  formData: TGeneratorFormOutput,
) {
  const qrCodePayload = getQRCodePayload(formData);

  const qrcodeImg = await generateQRCodeImg(qrCodePayload);

  return qrcodeImg;
}
