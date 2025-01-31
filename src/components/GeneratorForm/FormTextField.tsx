import { UseFormRegisterReturn } from "react-hook-form";
import { GeneratorFormInput } from "./GeneratorFormValidation";

type TFormTextFieldProps = {
  fieldName: keyof GeneratorFormInput;
  fieldType: Extract<React.HTMLInputTypeAttribute, "text" | "number">;
  labelText: string;
  rightLabel?: string;
  placeholder: string;
  register: UseFormRegisterReturn<keyof GeneratorFormInput>;
  fieldError?: string;
  isLoading: boolean;
  isSubmitting: boolean;
};

export function FormTextField({
  fieldName,
  fieldType = "text",
  labelText,
  rightLabel,
  placeholder,
  register,
  fieldError,
  isLoading,
  isSubmitting,
}: TFormTextFieldProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label p-0">
        <span className="label-text pl-4">{labelText}</span>
        {rightLabel && (
          <span className="label-text-alt text-xs">{rightLabel}</span>
        )}
      </div>
      <input
        {...register}
        disabled={isLoading || isSubmitting}
        id={fieldName}
        name={fieldName}
        type={fieldType}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
      />
      <span
        className={`error-message ${fieldError ? "" : "invisible"} h-4 pl-4 text-xs text-error`}
      >
        {fieldError}
      </span>
    </label>
  );
}
