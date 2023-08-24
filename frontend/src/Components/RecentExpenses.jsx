import { useEffect, useState } from "react";
import { useGetRecentExpensesMutation } from "../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { categories, monthNames, dayNames } from "../Data/categoriesData";
import { Link } from "react-router-dom";
import modalColor from "./Calculation/modalColor";
import { images } from "../Data/categoriesData";

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
    <div className="p-4 bg-slate-900 shadow-md rounded-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="font-bold text-xl text-white">Recent Expenses.</div>
        <Link to="/expenses" className="text-sm underline">
          See all
        </Link>
      </div>

      <div className="flex flex-col gap-2 text-white">
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

            const bgColor = modalColor(item.category);

            return (
              <div className={`collapse ${bgColor} rounded-xl`} key={item._id}>
                <input type="checkbox" />
                <div className="collapse-title font-medium flex justify-between items-center">
                  <div className="h-full flex  items-center">
                    <img
                      src={images[item.category]}
                      alt=""
                      className="w-8 h-8 mr-2 inline"
                    />
                    {item.description}
                  </div>
                  <span className="font-semibold">&#8377; {item.amount}</span>
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
