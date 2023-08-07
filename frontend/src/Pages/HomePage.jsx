import { useSelector } from "react-redux";
import AddExpense from "../Components/AddExpense.jsx";
import RecentExpenses from "../Components/RecentExpenses.jsx";
import Score from "../Components/Score.jsx";
import { Link } from "react-router-dom";
import MonthlyExpenses from "../Components/Charts/MonthlyExpenses.jsx";
import { useState, useEffect } from "react";
import { categories } from "../Data/categoriesData";
import { useSearchExpensesMutation } from "../Slices/expensesApiSlice.js";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { wallets } = useSelector((state) => state.wallets);

  const [expenses, setExpenses] = useState(null);

  const categoriesList = Object.keys(categories);
  const [searchExpenses, { isLoading }] = useSearchExpensesMutation();
  const getDates = (startingDate) => {
    const currentDate = new Date();
    let targetMonth = currentDate.getMonth() - startingDate;
    let targetYear = currentDate.getFullYear();

    if (targetMonth < 0) {
      targetMonth += 12;
      targetYear -= 1;
    }
    // First date of the target month
    const firstDate = new Date(targetYear, targetMonth, 1);
    if (startingDate == 1) {
      // for sending data of previous month
      const nextMonthFirstDay = new Date(
        targetYear,
        targetMonth + 1 == 12 ? 0 : targetMonth + 1,
        1
      );
      const lastDayOfMonth = new Date(nextMonthFirstDay - 1);

      return { start: firstDate, end: lastDayOfMonth, type: startingDate };
    }

    return { start: firstDate, end: currentDate, type: startingDate };
  };
  useEffect(() => {
    const getExp = async () => {
      const res = await searchExpenses({
        time: getDates(11),
        categories: categoriesList,
        wallets: wallets,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(res);
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
          <RecentExpenses />
          {expenses && (
            <div className="bg-base-300 rounded-xl p-4">
              <MonthlyExpenses expenses={expenses} />
            </div>
          )}
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
