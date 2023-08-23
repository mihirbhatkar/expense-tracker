import { BiTimeFive } from "react-icons/bi";

const TimeModal = ({ setDateRange, getDates, dateRange }) => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
  const year = currentDate.getFullYear();
  let btnLabel = "This month";
  switch (dateRange.type) {
    case 0:
      btnLabel = "This month";
      break;
    case 1:
      btnLabel = "Last month";
      break;
    case 2:
      btnLabel = "Last 3 months";
      break;
    case 5:
      btnLabel = "Last 6 months";
      break;
    case 11:
      btnLabel = "This year";
      break;
  }

  return (
    <>
      <button
        className="flex justify-center items-center gap-1 p-2 rounded-xl border-teal-300 border-4 bg-teal-300/60 text-lg hover:bg-teal-300 transition-all"
        onClick={() => window.timeModal.showModal()}
      >
        <BiTimeFive /> <span className="font-semibold">{btnLabel}</span>
      </button>
      <dialog id="timeModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="mx-auto flex flex-col gap-1">
            <h3 className="text-xl font-bold underline underline-offset-8 mb-4">
              Select time period.
            </h3>
            <button
              className={`btn ${dateRange.type === 0 && "btn-neutral"}`}
              onClick={() => setDateRange(getDates(0))}
            >
              This month
            </button>
            <button
              className={`btn ${dateRange.type === 1 && "btn-neutral"}`}
              onClick={() => setDateRange(getDates(1))}
            >
              Last month
            </button>
            <button
              className={`btn ${dateRange.type === 2 && "btn-neutral"}`}
              onClick={() => setDateRange(getDates(2))}
            >
              Last 3 months
            </button>
            <button
              className={`btn ${dateRange.type === 5 && "btn-neutral"}`}
              onClick={() => setDateRange(getDates(5))}
            >
              Last 6 months
            </button>
            <button
              className={`btn ${dateRange.type === 11 && "btn-neutral"}`}
              onClick={() => setDateRange(getDates(11))}
            >
              This year
            </button>

            {/* CREATING A MODAL FOR CUSTOM DATES */}
            <button
              className="btn"
              onClick={() => window.customTimeModal.showModal()}
            >
              Custom
            </button>
            <dialog
              id="customTimeModal"
              className="modal modal-bottom sm:modal-middle"
            >
              <form method="dialog" className="modal-box p-10">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <div className="flex flex-row gap-4">
                  <label htmlFor="start">Start date:</label>
                  <input
                    onChange={(e) =>
                      setDateRange({
                        start: e.target.value,
                        end: dateRange.end,
                      })
                    }
                    type="date"
                    name="start"
                    id="start"
                  />
                  <label htmlFor="end">End date:</label>

                  <input
                    onChange={(e) =>
                      setDateRange({
                        start: dateRange.start,
                        end: e.target.value,
                      })
                    }
                    defaultValue={`${year}-${month}-${day}`}
                    type="date"
                    name="end"
                    id="end"
                  />
                </div>
              </form>
            </dialog>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default TimeModal;
