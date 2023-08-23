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
      modalColor = `bg-[#FF9999]`;
      break;
    case "Food":
      modalColor = `bg-[#FFB366]`;
      break;
    case "Entertainment":
      modalColor = `bg-[#FFD966]`;
      break;
    case "Medical":
      modalColor = `bg-[#A3D977]`;
      break;
    case "Home Maintenance":
      modalColor = `bg-[#66CCCC]`;
      break;
    case "Vehicle Maintenance":
      modalColor = `bg-[#6699CC]`;
      break;
    case "Insurances":
      modalColor = `bg-[#CC99CC]`;
      break;
    case "Fitness":
      modalColor = `bg-[#FF99CC]`;
      break;
    case "Investment":
      modalColor = `bg-[#FFCC99]`;
      break;
    default:
      modalColor = `bg-base-200`;
  }

  return (
    <>
      <button
        className=""
        onClick={() => document.getElementById(expenseId).showModal()}
      >
        <div
          key={item._id}
          className="flex flex-col min-w-full items-center gap-4"
        >
          <div className={`${modalColor} rounded w-full p-2`}>
            <div className="grid grid-cols-[48px_auto] gap-2 p-2">
              <img
                src={images[item.category]}
                alt=""
                className="w-12 h-12 mr-2 inline"
              />
              <div className="flex justify-between h-full items-center">
                <span className="font-semibold text-lg text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
                  {item.category}
                </span>
                <span
                  className="text-xl font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]
"
                >
                  -&#8377;{item.amount}
                </span>
              </div>
            </div>
            <hr className="border-[1px] opacity-5 rounded-xl border-solid border-black mt-2" />
            <div className="grid grid-cols-[48px_auto] gap-2 bg-white p-2 rounded mt-2">
              <div className="text-4xl h-full my-auto">{day}</div>
              <div className="flex justify-between h-full items-center">
                <div className="italic font-semibold text-sm sm:text-lg text-left">
                  {weekday}, {month} {year} <br />
                </div>
                <span className="font-bold max-w-[200px] sm:max-w-full sm:text-lg text-sm text-right">
                  {item.description}
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
            <div className="grid grid-cols-[48px_auto] gap-4">
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
