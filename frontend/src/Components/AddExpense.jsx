import React from "react";
import { useAddExpenseMutation } from "../Slices/expensesApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUserWallets } from "../Slices/walletsSlice";
import { useGetAllWalletsMutation } from "../Slices/walletsApiSlice";
import { toast } from "react-toastify";
import WalletSelector from "../Components/WalletSelector.jsx";
import Loader from "./Loader";

const AddExpense = () => {
  const { selectedWallet } = useSelector((state) => state.wallets);
  const [getAllWallets] = useGetAllWalletsMutation();
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const dispatch = useDispatch();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = {
          amount: e.target.amount.value,
          category: e.target.category.value,
          date: e.target.date.value,
          description: e.target.description.value,
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
      className="flex flex-col gap-4 justify-self-center p-4 bg-base-200 rounded-xl"
    >
      <h1 className="text-2xl font-extrabold ">Add expense.</h1>
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
      <WalletSelector />

      <label htmlFor="amount" className="mt-[10px] font-semibold">
        Amount
      </label>
      <input
        type="number"
        name="amount"
        min="0"
        placeholder="enter amount"
        id="username"
        className="input input-bordered "
        required
      />

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
      {isLoading ? (
        <button className="btn btn-accent mt-4 " type="submit">
          <Loader />
        </button>
      ) : (
        <button className="btn btn-accent mt-4 " type="submit">
          Add!
        </button>
      )}
    </form>
  );
};
export default AddExpense;
