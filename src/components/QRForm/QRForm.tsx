import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormTextField } from "./FormTextField";
import { onSubmit } from "./QRFormService";
import { QRFormInput, QRFormOutput, qrFormSchema } from "./QRFormValidation";

export function QRForm() {
  const initialFormState: QRFormInput = {
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
  } = useForm<QRFormInput, unknown, QRFormOutput>({
    defaultValues: initialFormState,
    resolver: zodResolver(qrFormSchema),
  });

  return (
    <div
      id="qrform-container"
      className="prose mx-auto flex flex-col flex-nowrap py-3"
    >
      <h2 className="mx-auto">New Payment Code</h2>
      <form
        name="qr-form"
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex max-w-80 flex-col flex-nowrap gap-2"
        noValidate
      >
        <FormTextField
          fieldName="beneficiary"
          fieldType="text"
          labelText="Name of the Beneficiary"
          placeholder="John Doe"
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
