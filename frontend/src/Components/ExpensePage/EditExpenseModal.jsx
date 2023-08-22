import { monthNames, dayNames } from "../../Data/categoriesData";

const EditExpenseModal = ({ item, wallet }) => {
  const expenseId = item._id;

  const dateString = item.dateOfExpense;
  const date = new Date(dateString);

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  const weekday = dayNames[date.getDay()];

  return (
    <>
      <button
        className=""
        onClick={() => document.getElementById(expenseId).showModal()}
      >
        {/* {item.description} {item.amount} {item.category} {item.dateOfExpense}{" "}
        {wallet} */}
        <div
          key={item._id}
          className="flex flex-col min-w-full items-center gap-4"
        >
          <div className="bg-accent/50  rounded w-full p-2">
            <div className="grid grid-cols-[48px_auto] gap-2 p-2">
              <img
                src={
                  "https://static.moneylover.me/img/icon/ic_category_foodndrink.png"
                }
                alt=""
                className="w-12 h-12 mr-2 inline"
              />
              <div className="flex justify-between h-full items-center">
                <span className="font-semibold text-lg">{item.category}</span>
                <span className="text-xl font-semibold text-red-600">
                  -&#8377;{item.amount}
                </span>
              </div>
            </div>
            {/* <hr className="border-[1px] rounded-xl border-solid border-black mt-2" /> */}
            <div className="grid grid-cols-[48px_auto] gap-2 bg-white p-2 rounded mt-2">
              <span className="text-4xl">{day}</span>
              <div className="flex justify-between h-full items-center">
                <span className="italic">
                  {weekday}, {month} {year} <br />
                </span>
                <span className="font-bold">{item.description}</span>
              </div>
            </div>
          </div>
        </div>
      </button>
      <dialog
        id={`${expenseId}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          {item.description}
        </form>
      </dialog>
    </>
  );
};
export default EditExpenseModal;
