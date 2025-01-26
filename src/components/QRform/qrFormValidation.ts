import isIBAN, { IsIBANOptions } from "validator/lib/isIBAN";
import { z } from "zod";

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

const removeWhiteSpace = (input: string) => input.replaceAll(/\s+/g, "");

const SEPA_COUNTRIES = {
  AL: "Albania",
  AD: "Andorra",
  AT: "Austria",
  BE: "Belgium",
  BG: "Bulgaria",
  HR: "Croatia",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  EE: "Estonia",
  FI: "Finland",
  FR: "France",
  DE: "Germany",
  GR: "Greece",
  HU: "Hungary",
  IS: "Iceland",
  IE: "Ireland",
  IT: "Italy",
  LV: "Latvia",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MT: "Malta",
  MC: "Monaco",
  ME: "Montenegro",
  NL: "Netherlands",
  NO: "Norway",
  PL: "Poland",
  PT: "Portugal",
  RO: "Romania",
  SM: "San Marino",
  SK: "Slovakia",
  SI: "Slovenia",
  ES: "Spain",
  SE: "Sweden",
  CH: "Switzerland",
  GB: "United Kingdom",
  VA: "Vatican City State",
} as const;

const sepaCountryCodes = Object.keys(
  SEPA_COUNTRIES,
) as IsIBANOptions["whitelist"];
const ibanOptions: IsIBANOptions = { whitelist: sepaCountryCodes };

// IBAN
const ibanSchema = z
  .string({
    required_error: "Please enter an IBAN",
    invalid_type_error: "Please enter a valid IBAN",
  })
  .refine(
    (val) => {
      const trimmedVal = removeWhiteSpace(val);
      if (isIBAN(trimmedVal, ibanOptions)) return trimmedVal;
    },
    { message: "Please enter a valid IBAN" },
  );

// Beneficiary name
const fullnameRegex = new RegExp(
  /(^[A-Za-z]{3,16})([ ]{0,1})((([A-Za-z'-]{2,16})([ ]{0,1})){1,3})$/,
);

const beneficiarySchema = z
  .string({
    required_error: "Please enter a name",
    invalid_type_error: "Please enter a valid name",
  })
  .regex(fullnameRegex, "Please enter the full name")
  .min(1, "Please enter a name")
  .max(70, "Name too long: max 70 ch.")
  .trim();

// Amount
function formatAmount(amount: number) {
  const currencyFormatter = new Intl.NumberFormat("IE", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  const formattedAmount = currencyFormatter.format(amount);

  return formattedAmount;
}

const amountSchema = z
  .union([
    z
      .string({
        required_error: "Please enter the amount",
        invalid_type_error: "Please enter a valid amount",
      })
      .min(1, "Please enter the amount")
      .trim()
      .transform((x) => x.replace(/[^0-9.-]+/g, "")), // Remove non-digits
    z.number({ message: "Please enter a valid amount." }),
  ])
  .pipe(
    z.coerce
      .number()
      .gte(0.01, "Please enter at least € 0.01")
      .lte(999999999.99, "Amount shall not be € 1 bn+"),
  )
  .transform(formatAmount);

// Remittance
const remittanceSchema = z
  .string()
  .max(140, "Note too long: max 140 ch.")
  .trim()
  .optional();

// Identification
const IDENTIFICATION_VALUES = {
  SCT: "SCT",
  INST: "INST",
} as const;

// Convert boolean form data to Identification value for EPC QR Code
function boolToIdentificationValues(isInst: boolean) {
  // true = INST (default)
  return isInst ? IDENTIFICATION_VALUES.INST : IDENTIFICATION_VALUES.SCT;
}

const identificationSchema = z.boolean().transform(boolToIdentificationValues);

export const qrformSchema = z.object({
  beneficiary: beneficiarySchema,
  iban: ibanSchema,
  amount: amountSchema,
  remittance: remittanceSchema,
  identification: identificationSchema,
});

type QRForm = z.infer<typeof qrformSchema>;

export type QRFormInput = Omit<QRForm, "amount" | "identification"> & {
  amount: number | null;
  identification: boolean;
};
