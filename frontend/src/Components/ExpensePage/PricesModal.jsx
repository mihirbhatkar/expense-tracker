import { FaSort } from "react-icons/fa";
import { LiaSortSolid } from "react-icons/lia";

const PricesModal = ({ setPriceRange, priceRange }) => {
  return (
    <>
      <button
        className="flex justify-center items-center gap-1 rounded-xl font-semibold p-2 border-rose-300 border-4 bg-rose-300/60 text-lg hover:bg-rose-300 transition-all"
        onClick={() => window.pricesModal.showModal()}
      >
        <LiaSortSolid />
        Amount
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
          className="modal-box"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-xl font-bold underline underline-offset-8 mb-4">
            Set amount limit.
          </h3>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="lower" className="font-[500]">
                Lower Limit
              </label>
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
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="upper" className="font-[500]">
                Upper Limit
              </label>
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
