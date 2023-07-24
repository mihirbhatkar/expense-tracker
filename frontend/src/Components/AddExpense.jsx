import React from "react";

const AddExpense = () => {
  const expenseSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="rounded-xl  border-white border-2  justify-self-center">
      <form onSubmit={expenseSubmit} className="flex flex-col gap-4 p-4 ">
        <h1 className="text-4xl font-extrabold ">Add expense!</h1>
        <select
          required
          name="category"
          className="select select-bordered w-full max-w-xs font-semibold"
        >
          <option disabled defaultChecked>
            Select a category
          </option>
          <option value="Transportation">Transportation</option>
          <option value="Food">Food and Drinks</option>
        </select>
        <div className="flex items-center gap-4">
          <div className="space-x-2">
            <label htmlFor="amount" className="mt-[10px] font-semibold">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              min="0"
              placeholder="enter amount"
              id="username"
              className="input input-bordered w-44"
              required
            />
          </div>
          <div className="space-x-2">
            <label htmlFor="date" className="mb-[-10px] font-semibold">
              Date
            </label>
            <input
              type="date"
              name="date"
              placeholder="enter date"
              id="username"
              required
              className="input input-bordered "
            />
          </div>
        </div>

        <label htmlFor="description" className="">
          Description
        </label>
        <input
          type="text"
          name="description"
          placeholder="enter description"
          id="description"
          className="input input-bordered w-full"
          required
        />
        <button className="btn btn-accent mt-4 w-32">Add!</button>
      </form>
    </div>
  );
};
export default AddExpense;
