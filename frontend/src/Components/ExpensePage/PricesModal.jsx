const PricesModal = ({ setPriceRange, priceRange }) => {
  return (
    <>
      <button className="btn" onClick={() => window.pricesModal.showModal()}>
        AMOUNT
      </button>
      <dialog id="pricesModal" className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={(e) =>
            setPriceRange({
              upper: e.target.upper.value,
              lower: e.target.lower.value,
            })
          }
          method="dialog"
          className="modal-box p-10"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex gap-2">
            <input
              type="number"
              id="lower"
              name="lower"
              value={priceRange.lower}
              onChange={(e) =>
                setPriceRange({
                  lower: e.target.value,
                  upper: priceRange.upper,
                })
              }
              required
              className="input input-bordered"
              placeholder="lower limit"
            />
            <input
              type="number"
              required
              onChange={(e) =>
                setPriceRange({
                  lower: priceRange.lower,
                  upper: e.target.value,
                })
              }
              value={priceRange.upper}
              id="upper"
              name="upper"
              className="input input-bordered"
              placeholder="upper limit"
            />
          </div>
          <button className="btn btn-neutral mt-2" type="submit">
            {" "}
            SET
          </button>
        </form>
      </dialog>
    </>
  );
};
export default PricesModal;
