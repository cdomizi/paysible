import { getQRCodePayload, TQRCodeData } from "../GeneratorFormService";
import { TGeneratorFormOutput } from "../GeneratorFormValidation";

describe("GeneratorFormService", () => {
  describe("getQRCodePayload", () => {
    test("convert form data into well formatted QR code payload", () => {
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
      const expectedResult = Object.values(qrcodeData).join("\n");

      const qrcodePayload = getQRCodePayload(formData);

      expect(qrcodePayload).toStrictEqual(expectedResult);
    });
  });
});
