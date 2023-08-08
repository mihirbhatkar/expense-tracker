import { useEffect, useState } from "react";
import { useGetRecentExpensesMutation } from "../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { categories, monthNames, dayNames } from "../Data/categoriesData";
import { Link } from "react-router-dom";

const RecentExpenses = () => {
  const { wallets } = useSelector((state) => state.wallets);

  let walletNames = {};
  for (let i = 0; i < wallets.length; i++) {
    walletNames[`${wallets[i]._id}`] = wallets[i].walletName;
  }

  const [expenses, setExpenses] = useState([]);
  const [getRecentExpenses, { isLoading }] = useGetRecentExpensesMutation();

  useEffect(() => {
    const getExp = async () => {
      const exp = await getRecentExpenses().unwrap();
      setExpenses(exp.recentExpenses);
    };
    getExp();
  }, [wallets]);

  return (
    <div className="p-4 bg-base-300 rounded-xl">
      <div className="mb-4 flex justify-between">
        <div className="font-bold ">Recent Expenses.</div>
        <Link to="/expenses" className="text-sm underline">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        {isLoading ? (
          <Loader />
        ) : (
          expenses.map((item) => {
            const dateString = item.dateOfExpense;
            const date = new Date(dateString);
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            const day = date.getDate();
            const weekday = dayNames[date.getDay()];

            return (
              <div className="collapse bg-white rounded-xl" key={item._id}>
                <input type="checkbox" />
                <div className="collapse-title font-medium flex justify-between ">
                  <div>
                    {categories[`${item.category}`]}
                    {item.description}
                  </div>
                  <div>{item.amount}</div>
                </div>
                <div className="collapse-content text-sm">
                  Wallet: {walletNames[`${item.walletId}`]} |||
                  {`${day}/${date.getMonth() + 1}/${year}`} ||| {item.category}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default RecentExpenses;
