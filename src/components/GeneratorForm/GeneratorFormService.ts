import { SubmitHandler } from "react-hook-form";
import {
  Amount,
  Beneficiary,
  GeneratorFormOutput,
  IBAN,
  Identification,
  Remittance,
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

type QRcodeData = {
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

export function getQRcodeData(formData: GeneratorFormOutput): QRcodeData {
  const { beneficiary, iban, amount, identification, remittance } = formData;

  const qrCodeData: QRcodeData = {
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

function formatQRcodePayload(qrCodeData: QRcodeData) {
  const qrCodeDataValues = Object.values(qrCodeData);
  const qrCodePayload = qrCodeDataValues.join("\n");

  return qrCodePayload;
}

function getQRcodePayload(formData: GeneratorFormOutput) {
  const qrCodeData = getQRcodeData(formData); // Get data
  const qrCodePayload = formatQRcodePayload(qrCodeData); // Format data

  return qrCodePayload;
}

export const onSubmit: SubmitHandler<GeneratorFormOutput> = (formData) => {
  const qrCodePayload = getQRcodePayload(formData);

  console.log(qrCodePayload);
};
