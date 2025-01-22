export function QRform() {
  function handleFormSubmit(formData: FormData) {
    console.log(formData);
  }

  return (
    <div
      id="qrform-container"
      className="prose mx-auto flex flex-col flex-nowrap py-3"
    >
      <h2 className="mx-auto">New Payment Code</h2>
      <form
        name="qr-form"
        action={handleFormSubmit}
        className="mx-auto flex max-w-80 flex-col flex-nowrap gap-3"
      >
        <label
          aria-label="beneficiary"
          className="form-control w-full max-w-xs"
        >
          <span className="label-text pl-4">Name of the Beneficiary</span>
          <input
            id="beneficiary"
            type="text"
            placeholder="John Doe"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <span className="error-message text-xs text-error">
            Please enter the beneficiary name
          </span>
        </label>
        <label aria-label="iban" className="form-control w-full max-w-xs">
          <span className="label-text pl-4">IBAN</span>
          <input
            id="iban"
            type="text"
            placeholder="IE25BOFI900017528416"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <span className="error-message text-xs text-error">
            Please insert a valid IBAN
          </span>
        </label>
        <label aria-label="amount" className="form-control w-full max-w-xs">
          <span className="label-text pl-4">Amount (€)</span>
          <input
            id="amount"
            type="number"
            placeholder="10.00"
            className="input input-bordered w-full max-w-xs"
            required
          />
          <span className="error-message text-xs text-error">
            Enter at least € 0.01
          </span>
        </label>
        <label aria-label="remittance" className="form-control w-full max-w-xs">
          <div className="label p-0">
            <span className="label-text pl-4">Note</span>
            <span className="label-text-alt text-xs">(optional - max 140)</span>
          </div>
          <input
            id="remittance"
            type="text"
            placeholder="Gas ⛽"
            className="input input-bordered w-full max-w-xs"
          />
          <span className="error-message text-xs text-error">
            Please limit your note to 140 characters
          </span>
        </label>
        <div className="form-control"></div>
        <label
          aria-label="identification"
          className="label cursor-pointer justify-start gap-2"
        >
          <input
            id="identification"
            type="checkbox"
            defaultChecked
            className="checkbox"
          />
          <span className="label-text">Instant Payment</span>
        </label>
        <button className="btn btn-accent mt-5 tracking-widest">
          GENERATE
        </button>
      </form>
    </div>
  );
}
