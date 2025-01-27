import { SubmitHandler } from "react-hook-form";
import {
  Amount,
  Beneficiary,
  IBAN,
  Identification,
  QRFormOutput,
  Remittance,
} from "./QRFormValidation";

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

type QRcodeFields = {
  serviceTag: "BCD";
  version: "002";
  characterSet: "1";
  identification: Identification;
  bic: "";
  name: Beneficiary;
  iban: IBAN;
  amount: Amount;
  purpose: "";
  remittanceRef: "";
  remittance: Remittance;
  information: "";
};

export function getQRcodeFields(formData: QRFormOutput): QRcodeFields {
  const { beneficiary, iban, amount, identification, remittance } = formData;

  const qrCodeFields: QRcodeFields = {
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

  return qrCodeFields;
}

function formatQRcodeData(qrCodeFields: QRcodeFields) {
  const qrCodeFieldsValues = Object.values(qrCodeFields);
  const qrCodeData = qrCodeFieldsValues.join("\n");

  return qrCodeData;
}

function getQRcodeData(formData: QRFormOutput) {
  const qrCodeFields = getQRcodeFields(formData); // Get data
  const qrCodeData = formatQRcodeData(qrCodeFields); // Format data

  return qrCodeData;
}

export const onSubmit: SubmitHandler<QRFormOutput> = (formData) => {
  const qrCodeData = getQRcodeData(formData);

  console.log(qrCodeData);
};
