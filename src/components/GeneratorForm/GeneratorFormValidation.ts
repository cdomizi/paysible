import isIBAN, { IsIBANOptions } from "validator/lib/isIBAN";
import { z } from "zod";

export function removeWhiteSpace(str: string): string {
  return str.replaceAll(/\s+/g, "");
}

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
export const ibanSchema = z
  .string({
    required_error: "Please enter an IBAN",
    invalid_type_error: "Please enter a valid IBAN",
  })
  .transform((iban, ctx) => {
    const uppercaseIBAN = iban.toUpperCase();
    const trimmedIBAN = removeWhiteSpace(uppercaseIBAN);

    if (isIBAN(trimmedIBAN, ibanOptions)) return trimmedIBAN; // Valid IBAN

    // Invalid IBAN
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter a valid IBAN",
    });
  });

export type TIban = z.output<typeof ibanSchema>;

// Beneficiary name
const fullnameRegex = new RegExp(
  /(^[A-Za-z]{3,16})([ ]{0,1})((([A-Za-z'-]{2,16})([ ]{0,1})){1,3})$/,
);

export const beneficiarySchema = z
  .string({
    required_error: "Please enter a name",
    invalid_type_error: "Please enter a valid name",
  })
  .max(70, "Name too long: max 70 ch.")
  .transform((name, ctx) => {
    const trimmedName = name.trim();
    const validName = fullnameRegex.exec(trimmedName);

    if (validName) return validName[0]; // Valid name

    // Invalid name
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please enter the full name",
    });
  });

export type TBeneficiary = z.infer<typeof beneficiarySchema>;

// Amount
export function formatAmount(amount: number): string {
  const PREFIX = "EUR";

  const currencyFormatter = new Intl.NumberFormat("en", {
    currency: "EUR",
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  });
  const formattedAmount = PREFIX + currencyFormatter.format(amount);

  return formattedAmount;
}

export const amountSchema = z
  .union([
    z
      .string({
        required_error: "Please enter the amount",
        invalid_type_error: "Please enter a valid amount",
      })
      .transform((amount) => amount.replace(/[^0-9.-]+/g, "")), // Remove non-digits
    z.number({
      required_error: "Please enter the amount",
      invalid_type_error: "Please enter a valid amount",
    }),
    z.null({
      required_error: "Please enter the amount",
      invalid_type_error: "Please enter a valid amount",
    }),
  ])
  .pipe(
    z.coerce
      .number()
      .gte(0.01, "Please enter at least € 0.01")
      .lte(999999999.99, "Amount shall not be € 1 bn+"),
  )
  .transform(formatAmount);

export type TAmount = z.output<typeof amountSchema>;

export function nullUndefinedToEmptyString(
  input: null | undefined | string,
): string {
  return input ?? "";
}

// Remittance
export const remittanceSchema = z
  .union([
    z.string({ message: "Please enter a valid note text" }),
    z.null().transform(nullUndefinedToEmptyString),
    z.undefined().transform(nullUndefinedToEmptyString),
  ])
  .pipe(
    z.coerce.string().max(140, "Note too long: max 140 ch.").trim().optional(),
  );

export type TRemittance = z.infer<typeof remittanceSchema>;

// Identification
const IDENTIFICATION_VALUES = {
  SCT: "SCT",
  INST: "INST",
} as const;

// Convert boolean form data to Identification value for EPC QR Code
export function boolToIdentificationValues(
  isInst: boolean,
): (typeof IDENTIFICATION_VALUES)[keyof typeof IDENTIFICATION_VALUES] {
  // true = INST (default)
  return isInst ? IDENTIFICATION_VALUES.INST : IDENTIFICATION_VALUES.SCT;
}

const identificationSchema = z.boolean().transform(boolToIdentificationValues);

export type TIdentification = z.output<typeof identificationSchema>;

export const generatorFormSchema = z.object({
  beneficiary: beneficiarySchema,
  iban: ibanSchema,
  amount: amountSchema,
  remittance: remittanceSchema,
  identification: identificationSchema,
});

export type TGeneratorFormInput = z.input<typeof generatorFormSchema>;
export type TGeneratorFormOutput = z.output<typeof generatorFormSchema>;
