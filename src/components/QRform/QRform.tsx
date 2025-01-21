export function QRform() {
  function handleFormSubmit() {
    return;
  }

  return (
    <div id="qrform-container" className="py-3">
      <form
        name="qr-form"
        action={handleFormSubmit}
        className="flex flex-col gap-3 max-w-80 mx-auto"
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
        </label>
        <label aria-label="remittance" className="form-control w-full max-w-xs">
          <span className="label-text pl-4">Note</span>
          <input
            id="remittance"
            type="text"
            placeholder="Gas ⛽"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn btn-neutral mt-5">Generate</button>
      </form>
    </div>
  );
}
