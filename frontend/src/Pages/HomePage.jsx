import { useSelector } from "react-redux";
import RecentExpenses from "../Components/RecentExpenses.jsx";
import Score from "../Components/Score.jsx";
import { Link } from "react-router-dom";
import IndividualMonthExpense from "../Components/Charts/IndividualMonthExpense.jsx";
import { useEffect, useState } from "react";
import { categories } from "../Data/categoriesData.js";
import { useSearchExpensesMutation } from "../Slices/expensesApiSlice.js";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { wallets } = useSelector((state) => state.wallets);

  const [expenses, setExpenses] = useState([]);
  const [searchExpenses] = useSearchExpensesMutation();
  function getDates(year, month) {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    return {
      start: new Date(year, month, 1),
      end: date,
    };
  }

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    const getExp = async () => {
      const expenses = await searchExpenses({
        time: getDates(year, month - 1),
        categories: Object.keys(categories),
        wallets: wallets,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(expenses);
    };
    getExp();
  }, [wallets]);

  return userInfo ? (
    <div className="p-4 lg:grid lg:grid-cols-2 lg:justify-self-center gap-4 flex flex-col ">
      {wallets.length === 0 ? (
        <p>
          You have no wallets.{" "}
          <Link to="/wallets">Add a wallet to get started!</Link>
        </p>
      ) : (
        <>
          <Score wallets={wallets} />

          <div className="bg-base-300 rounded-xl p-4">
            <div className="mb-4 flex justify-between">
              <div className="font-bold ">This month's expenses</div>
              <Link to="/insights" className="text-sm underline ">
                See all insights
              </Link>
            </div>
            <IndividualMonthExpense
              expenses={expenses}
              year={new Date().getFullYear()}
              month={new Date().getMonth() + 1}
            />
          </div>
          <RecentExpenses />
        </>
      )}

      {/* <AddExpense /> */}
    </div>
  ) : (
    <div className="text-center flex justify-center items-center flex-col min-h-[var(--min-page-height)] text-4xl font-bold">
      <div className="mb-[var(--navbar-height)] gap-16 flex lg:flex-row flex-col items-center justify-center">
        <div>
          <h1 className="text-8xl">💵</h1>
          <h1 className="text-6xl font-extrabold mt-4 hidden lg:block ">
            stackSense!
          </h1>
        </div>
        <div className="w-96">
          Financial <span className="text-emerald-500">finesse</span> <br /> at
          your fingertips. <br />
          <span className="text-xl font-light w-6 ">
            Your go-to expense tracker web app for mastering your finances.{" "}
            Effortlessly manage expenses, gain financial insights, and stack up
            your savings for a brighter future
          </span>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
