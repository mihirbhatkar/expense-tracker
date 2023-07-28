const EditExpenseModal = ({ item, wallet }) => {
  const expenseId = item._id;

  return (
    <>
      <button
        className=""
        onClick={() => document.getElementById(expenseId).showModal()}
      >
        {item.description} {item.amount} {item.category} {item.dateOfExpense}{" "}
        {wallet}
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
