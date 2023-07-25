import React from "react";
import { useAddExpenseMutation } from "../Slices/expensesApiSlice";
import { useDispatch } from "react-redux";

const AddExpense = () => {
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const dispatch = useDispatch();

  const expenseSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={expenseSubmit}
      className="flex flex-col gap-4 items-start justify-self-center p-4 bg-base-200 rounded-xl"
    >
      <h1 className="text-2xl font-extrabold ">Add expense!</h1>
      <select
        required
        name="category"
        className="select select-bordered w-full max-w-xs font-semibold text-lg"
      >
        <option disabled defaultChecked>
          Select a category
        </option>
        <option value="Transportation">🚘Transportation</option>
        <option value="Food">🍕Food and Drinks</option>
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
          <label htmlFor="date" className="mt-[10px] font-semibold">
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
      <label htmlFor="description" className="mt-[10px] font-semibold">
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
      <button className="btn btn-accent mt-4 w-32" type="submit">
        Add!
      </button>
    </form>
  );
};
export default AddExpense;
