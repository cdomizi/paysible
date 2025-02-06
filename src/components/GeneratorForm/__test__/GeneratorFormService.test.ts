import { isBase64 } from "validator";
import {
  generateQRCodeImg,
  getQRCodePayload,
  TQRCodeData,
} from "../GeneratorFormService";
import { TGeneratorFormOutput } from "../GeneratorFormValidation";

const qrcodeData: TQRCodeData = {
  serviceTag: "BCD",
  version: "002",
  characterSet: "1",
  identification: "INST",
  bic: "",
  name: "Jane Doe",
  iban: "IE29AIBK93115212345678",
  amount: "EUR10.00",
  purpose: "",
  remittanceRef: "",
  remittance: "Gas ⛽",
  information: "",
};
const formData: TGeneratorFormOutput = {
  amount: qrcodeData.amount,
  identification: qrcodeData.identification,
  beneficiary: qrcodeData.name,
  iban: qrcodeData.iban,
  remittance: qrcodeData.remittance,
};

const qrcodePayload = Object.values(qrcodeData).join("\n");

describe("GeneratorFormService", () => {
  describe("getQRCodePayload", () => {
    test("convert form data into well formatted QR code payload", () => {
      const qrcodePayload = getQRCodePayload(formData);

      expect(qrcodePayload).toStrictEqual(qrcodePayload);
    });
  });

  describe("generateQRCodeImg", () => {
    test("generates QR code image from valid payload", async () => {
      const dataURLPrefix = new RegExp(/^data:image\/png;base64,/);

      const qrcodeImg = await generateQRCodeImg(qrcodePayload);

      const encodedImg = qrcodeImg?.substring(22);

      expect(qrcodeImg).toBeDefined();
      expect(qrcodeImg).toMatch(dataURLPrefix); // Correct prefix for dataURL
      expect(isBase64(encodedImg!)).toBe(true); // Image is base64 encoded
    });
  });
});
