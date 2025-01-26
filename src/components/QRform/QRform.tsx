import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { QRFormInput, qrformSchema } from "./qrFormValidation";

export function QRform() {
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
  } = useForm({
    defaultValues: initialFormState,
    resolver: zodResolver(qrformSchema),
  });

  const onSubmit: SubmitHandler<QRFormInput> = (data) => {
    console.log(data);
  };

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
        <label
          aria-label="beneficiary"
          className="form-control w-full max-w-xs"
        >
          <span className="label-text pl-4">Name of the Beneficiary</span>
          <input
            {...register("beneficiary")}
            disabled={isLoading || isSubmitting}
            id="beneficiary"
            name="beneficiary"
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full max-w-xs"
          />
          <span
            className={`error-message ${errors.beneficiary?.message ? "" : "invisible"} h-4 pl-4 text-xs text-error`}
          >
            {errors.beneficiary?.message}
          </span>
        </label>
        <label aria-label="iban" className="form-control w-full max-w-xs">
          <span className="label-text pl-4">IBAN</span>
          <input
            {...register("iban")}
            disabled={isLoading || isSubmitting}
            id="iban"
            name="iban"
            type="text"
            placeholder="IE25BOFI900017528416"
            className="input input-bordered w-full max-w-xs"
          />
          <span
            className={`error-message ${errors.iban?.message ? "" : "invisible"} h-4 pl-4 text-xs text-error`}
          >
            {errors.iban?.message}
          </span>
        </label>
        <label aria-label="amount" className="form-control w-full max-w-xs">
          <span className="label-text pl-4">Amount (€)</span>
          <input
            {...register("amount")}
            disabled={isLoading || isSubmitting}
            id="amount"
            name="amount"
            type="number"
            placeholder="10.00"
            className="input input-bordered w-full max-w-xs"
          />
          <span
            className={`error-message ${errors.amount?.message ? "" : "invisible"} h-4 pl-4 text-xs text-error`}
          >
            {errors.amount?.message}
          </span>
        </label>
        <label aria-label="remittance" className="form-control w-full max-w-xs">
          <div className="label p-0">
            <span className="label-text pl-4">Note</span>
            <span className="label-text-alt text-xs">(optional - max 140)</span>
          </div>
          <input
            {...register("remittance")}
            disabled={isLoading || isSubmitting}
            id="remittance"
            name="remittance"
            type="text"
            placeholder="Gas ⛽"
            className="input input-bordered w-full max-w-xs"
          />
          <span
            className={`error-message ${errors.remittance?.message ? "" : "invisible"} h-4 pl-4 text-xs text-error`}
          >
            {errors.remittance?.message}
          </span>
        </label>
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
