import { monthNames, dayNames } from "../../Data/categoriesData";
import { images } from "../../Data/categoriesData";
const EditExpenseModal = ({ item, wallet }) => {
  const expenseId = item._id;

  const dateString = item.dateOfExpense;
  const date = new Date(dateString);

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  const weekday = dayNames[date.getDay()];

  let modalColor = `bg-base-200`;
  switch (item.category) {
    case "Transportation":
      modalColor = `bg-gradient-to-b from-[#FF9999] to-[#FF9999]/60`;
      break;
    case "Food":
      modalColor = `bg-gradient-to-b from-[#FFB366] to-[#FFB366]/60`;
      break;
    case "Entertainment":
      modalColor = `bg-gradient-to-b from-[#FFD966] to-[#FFD966]/60`;
      break;
    case "Medical":
      modalColor = `bg-gradient-to-b from-[#A3D977] to-[#A3D977]/60`;
      break;
    case "Home Maintenance":
      modalColor = `bg-gradient-to-b from-[#66CCCC] to-[#66CCCC]/60`;
      break;
    case "Vehicle Maintenance":
      modalColor = `bg-gradient-to-b from-[#6699CC] to-[#6699CC]/60`;
      break;
    case "Insurances":
      modalColor = `bg-gradient-to-b from-[#CC99CC] to-[#CC99CC]/60`;
      break;
    case "Fitness":
      modalColor = `bg-gradient-to-b from-[#FF99CC] to-[#FF99CC]/60`;
      break;
    case "Investment":
      modalColor = `bg-gradient-to-b from-[#FFCC99] to-[#FFCC99]/60`;
      break;
    default:
      modalColor = `bg-gradient-to-b bg-base-200`;
  }

  return (
    <>
      <button
        className=""
        onClick={() => document.getElementById(expenseId).showModal()}
      >
        <div
          key={item._id}
          className="flex flex-col min-w-full items-center gap-4 "
        >
          <div className={`${modalColor} rounded w-full p-2`}>
            <div className="grid grid-cols-[48px_auto] items-center gap-4 p-2">
              <img
                src={images[item.category]}
                alt=""
                className="w-12 h-12 inline mr-2"
              />

              {/* <div className="flex justify-between h-full items-center">
                <span className="font-semibold text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                  {item.category}
                </span>
                <span
                  className="text-xl font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]
"
                >
                  -&#8377;{item.amount}
                </span>
              </div> */}

              <div className="text-left flex justify-between items-center">
                <div>
                  <h1 className="text-xl font-bold">{item.description}</h1>
                  <h2 className="font-semibold opacity-50">
                    <div className="italic font-semibold text-sm sm:text-lg text-left">
                      {day} {month}, {year} <br />
                    </div>
                  </h2>
                </div>
                <span
                  className="text-xl font-semibold text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)]
"
                >
                  &#8377;{item.amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </button>
      <dialog
        id={`${expenseId}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className={`${modalColor} modal-box p-6`}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">
            ✕
          </button>

          <div
            className="
          flex flex-col w-full items-start gap-2 bg-white p-4 rounded-xl"
          >
            <div className="grid grid-cols-[48px_auto] items-center gap-4">
              <img
                src={images[item.category]}
                alt=""
                className="w-12 h-12 mr-2 inline"
              />
              <div className="text-left">
                <h1 className="text-xl font-bold">{item.description}</h1>
                <h2 className="font-semibold opacity-50">{item.category}</h2>
              </div>
            </div>
            <hr className="border-2 border-black rounded-xl w-full" />
            <div>
              <span className="font-semibold">
                Amount:{" "}
                <span className="text-red-600"> &#8377;{item.amount}</span>
              </span>
            </div>
            <div>
              <span className="font-semibold">Date of expense:</span> {day}{" "}
              {month} {year}
            </div>
            <span className="">
              <img
                src={"./images/wallet.png"}
                alt=""
                className="w-6 h-6 mr-2 inline"
              />
              : {wallet}
            </span>

            {/* <button className="btn bg-red-600 text-white">Delete</button> */}
          </div>
        </form>
      </dialog>
    </>
  );
};
export default EditExpenseModal;
