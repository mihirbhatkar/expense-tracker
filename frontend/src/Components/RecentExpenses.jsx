import { useEffect, useState } from "react";
import { useGetRecentExpensesMutation } from "../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const RecentExpenses = () => {
  const { wallets } = useSelector((state) => state.wallets);

  let walletNames = {};
  for (let i = 0; i < wallets.length; i++) {
    walletNames[`${wallets[i]._id}`] = wallets[i].walletName;
  }

  const [expenses, setExpenses] = useState(null);
  const [getRecentExpenses, { isLoading }] = useGetRecentExpensesMutation();

  useEffect(() => {
    const getExp = async () => {
      const exp = await getRecentExpenses().unwrap();
      setExpenses(exp.recentExpenses);
    };
    getExp();
  }, [wallets]);

  return (
    <div className="flex flex-col gap-4">
      Recent Expenses.
      {isLoading && <Loader />}
      {expenses &&
        expenses.map((item) => {
          return (
            <div key={item._id}>
              {walletNames[`${item.walletId}`]}, {item.description},{" "}
              {item.amount}, {item.dateOfExpense}
            </div>
          );
        })}
    </div>
  );
};
export default RecentExpenses;
