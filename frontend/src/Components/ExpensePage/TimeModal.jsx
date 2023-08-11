const TimeModal = ({ setDateRange, getDates, dateRange }) => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
  const year = currentDate.getFullYear();

  return (
    <>
      <button className="btn" onClick={() => window.timeModal.showModal()}>
        TIME PERIOD
      </button>
      <dialog id="timeModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-col gap-1">
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
              TIME PERIOD
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
