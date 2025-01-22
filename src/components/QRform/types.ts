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
 * 8. Amount:                ...
 * 9. Purpose:               /
 * 10. Remittance (ref.):    /
 * 11. Remittance (text):    ...
 * 12. Information:          /
 */

const removeWhiteSpace = (input: string) => input.replaceAll(/\s+/g, "");

// IBAN
const ibanSchema = z.union([
  z.string().regex(/^(IT)\d{2}[A-Z]{1}\d{22}$/),
  z.string().regex(/^NL\d{2}[A-Z]{4}\d{10}$/),
  z.string().regex(/^LV\d{2}[A-Z]{4}\d{13}$/),
  z.string().regex(/^(BG|GB|IE)\d{2}[A-Z]{4}\d{14}$/),
  z.string().regex(/^(IE)\d{2}[A-Z]{4}\d{12}$/),
  z.string().regex(/^GI\d{2}[A-Z]{4}\d{15}$/),
  z.string().regex(/^RO\d{2}[A-Z]{4}\d{16}$/),
  z.string().regex(/^NO\d{13}$/),
  z.string().regex(/^(DK|FI|FO)\d{16}$/),
  z.string().regex(/^(SI)\d{17}$/),
  z.string().regex(/^(AT|EE|LU|LT)\d{18}$/),
  z.string().regex(/^(HR|LI|CH)\d{19}$/),
  z.string().regex(/^(DE)\d{20}$/),
  z.string().regex(/^(CZ|ES|SK|SE)\d{22}$/),
  z.string().regex(/^PT\d{23}$/),
  z.string().regex(/^FR\d{22}[A-Z]\d{2}$/),
  z.string().regex(/^(IS)\d{24}$/),
  z.string().regex(/^(BE)\d{14}$/),
  z.string().regex(/^(FR|MC|GR|SM)\d{25}$/),
  z.string().regex(/^(PL|HU|CY)\d{26}$/),
  z.string().regex(/^MT\d{2}[A-Z]{4}\d{23}$/),
]);

type IBAN = z.infer<typeof ibanSchema>;

// Remittance
const remittanceSchema = z.string().max(140).trim().optional();

type Remittance = z.infer<typeof remittanceSchema>;

// Beneficiary name
const beneficiarySchema = z.string().max(70).trim();

type Beneficiary = z.infer<typeof beneficiarySchema>;

// Amount
const amountSchema = z
  .union([
    z
      .string()
      .trim()
      .transform((x) => x.replace(/[^0-9.-]+/g, "")),
    z.number(),
  ])
  .pipe(z.coerce.number().min(0.01).max(999999999.99));

type Amount = z.infer<typeof amountSchema>;

// Identification
const IDENTIFICATION_VALUES = {
  SCT: "SCT",
  INST: "INST",
} as const;

type IdentificationValues = keyof typeof IDENTIFICATION_VALUES;

// Convert boolean form data to Identification value for EPC QR Code
function boolToIdentificationValues(isInst: boolean) {
  // true = INST (default)
  return isInst ? IDENTIFICATION_VALUES.INST : IDENTIFICATION_VALUES.SCT;
}

const identificationSchema = z.boolean().transform(boolToIdentificationValues);

type Identification = z.infer<typeof identificationSchema>;
