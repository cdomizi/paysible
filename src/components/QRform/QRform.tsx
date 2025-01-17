export function QRform() {
  function handleFormSubmit() {
    return;
  }

  return (
    <div id="qrform-container">
      <form name="qr-form" action={handleFormSubmit}>
        <label
          aria-label="beneficiary"
          className="input input-bordered flex items-center gap-2"
        >
          Name
          <input
            id="beneficiary"
            type="text"
            placeholder="John Doe"
            className="input w-full max-w-xs"
          />
        </label>
        <label
          aria-label="iban"
          className="input input-bordered flex items-center gap-2"
        >
          IBAN
          <input
            id="iban"
            type="text"
            placeholder="IE25BOFI900017528416"
            className="input w-full max-w-xs"
          />
        </label>
        <label
          aria-label="amount"
          className="input input-bordered flex items-center gap-2"
        >
          Amount
          <input
            id="amount"
            type="text"
            placeholder="10.00"
            className="input w-full max-w-xs"
          />
          <span>€</span>
        </label>
        <button className="btn btn-neutral">Generate</button>
      </form>
    </div>
  );
}
