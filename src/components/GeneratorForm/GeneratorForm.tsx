import { zodResolver } from "@hookform/resolvers/zod";
import { useQRCode } from "@hooks/useQRCode";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormTextField } from "./FormTextField";
import { generateQRCodeFromPayload } from "./GeneratorFormService";
import {
  TGeneratorFormInput,
  TGeneratorFormOutput,
  generatorFormSchema,
} from "./GeneratorFormValidation";

export function GeneratorForm() {
  const initialFormState: TGeneratorFormInput = {
    beneficiary: "",
    iban: "",
    amount: null,
    remittance: "",
    identification: true,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<TGeneratorFormInput, unknown, TGeneratorFormOutput>({
    defaultValues: initialFormState,
    resolver: zodResolver(generatorFormSchema),
  });

  const { setQRCode } = useQRCode();

  const onSubmit: SubmitHandler<TGeneratorFormOutput> = async (formData) => {
    // Generate QR code from form payload
    const qrCode = await generateQRCodeFromPayload(formData);

    // Display generated QR code
    if (qrCode) setQRCode(qrCode);
  };

  return (
    <div
      id="qrform-container"
      className="prose mx-auto flex w-fit flex-col flex-nowrap py-3 md:mx-0 md:w-60"
    >
      <h2 className="mx-auto md:hidden">New Payment Code</h2>
      <form
        name="qr-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col flex-nowrap gap-2"
        noValidate
      >
        <FormTextField
          fieldName="beneficiary"
          fieldType="text"
          labelText="Name of the Beneficiary"
          placeholder="Jane Doe"
          {...{
            register: register("beneficiary"),
            fieldError: errors.beneficiary?.message,
            isLoading,
            isSubmitting,
          }}
        />
        <FormTextField
          fieldName="iban"
          fieldType="text"
          labelText="IBAN"
          placeholder="IE29AIBK93115212345678"
          {...{
            register: register("iban"),
            fieldError: errors.iban?.message,
            isLoading,
            isSubmitting,
          }}
        />
        <FormTextField
          fieldName="amount"
          fieldType="number"
          labelText="Amount (€)"
          placeholder="10.00"
          {...{
            register: register("amount"),
            fieldError: errors.amount?.message,
            isLoading,
            isSubmitting,
          }}
        />
        <FormTextField
          fieldName="remittance"
          fieldType="text"
          labelText="Note"
          rightLabel="(optional - max 140)"
          placeholder="Gas ⛽"
          {...{
            register: register("remittance"),
            fieldError: errors.remittance?.message,
            isLoading,
            isSubmitting,
          }}
        />
        <div className="flex justify-between">
          <label
            aria-label="identification"
            className="label cursor-pointer justify-start gap-2"
          >
            <input
              {...register("identification")}
              disabled={isLoading || isSubmitting}
              id="identification"
              name="identification"
              type="checkbox"
              className="checkbox"
              defaultChecked={initialFormState.identification}
            />
            <span className="label-text">Instant Payment</span>
          </label>
          <button
            disabled={isLoading || isSubmitting}
            onClick={() => reset}
            className="btn"
            type="reset"
          >
            Clear
          </button>
        </div>
        <button
          disabled={isLoading || isSubmitting}
          className="btn btn-accent mt-5 tracking-widest"
        >
          GENERATE
        </button>
      </form>
    </div>
  );
}
