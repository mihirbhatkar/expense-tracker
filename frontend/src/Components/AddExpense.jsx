import React from "react";
import { useAddExpenseMutation } from "../Slices/expensesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserWallets } from "../Slices/walletsSlice";
import { useGetAllWalletsMutation } from "../Slices/walletsApiSlice";
import { toast } from "react-toastify";
import WalletSelector from "../Components/WalletSelector.jsx";
import Loader from "./Loader";
import { categories } from "../Data/categoriesData";

const AddExpense = () => {
  const { selectedWallet } = useSelector((state) => state.wallets);
  const [getAllWallets] = useGetAllWalletsMutation();
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const categoriesList = Object.keys(categories);

  const dispatch = useDispatch();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = {
          amount: e.target.amount.value,
          category: e.target.category.value,
          date: e.target.date.value,
          description: e.target.description.value || "",
        };

        try {
          const res = await addExpense({
            data: data,
            walletId: selectedWallet._id,
          }).unwrap();
          const resWallets = await getAllWallets();
          dispatch(setUserWallets(resWallets.data));
          toast.success(res.message);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      }}
      className="flex flex-col gap-1 justify-self-center p-1 rounded-xl"
    >
      <h1 className="text-2xl font-extrabold underline underline-offset-8">
        Add an expense.
      </h1>
      <select
        required
        name="category"
        className="select select-bordered w-full font-semibold text-md mt-3 rounded"
      >
        <option disabled defaultChecked>
          Select a category
        </option>
        {categoriesList.map((item) => {
          return (
            <option key={item} value={item}>
              {categories[item]}
              {item}
            </option>
          );
        })}
      </select>
      <div className="mt-3">
        <WalletSelector />
      </div>
      <div className="grid grid-cols-2 mt-3 gap-1">
        <div className="gap-1 flex flex-col">
          <label htmlFor="amount" className="font-semibold">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            min="0"
            placeholder="enter amount"
            id="username"
            className="p-2 rounded border-2 h-full"
            required
          />
        </div>
        <div className="gap-1 flex flex-col">
          <label htmlFor="date" className="font-semibold">
            Date
          </label>
          <input
            type="date"
            name="date"
            placeholder="enter date"
            id="username"
            required
            className="p-2 rounded border-2"
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <label htmlFor="description" className="mt-3 mb-1 font-semibold">
          Description
        </label>
        <input
          type="text"
          name="description"
          placeholder="enter description"
          id="description"
          className="p-2 rounded border-2"
        />
      </div>
      {isLoading ? (
        <button className="btn btn-accent mt-4 " type="submit">
          <Loader />
        </button>
      ) : (
        <button className="btn btn-accent mt-4 font-extrabold" type="submit">
          Add
        </button>
      )}
    </form>
  );
};
export default AddExpense;
