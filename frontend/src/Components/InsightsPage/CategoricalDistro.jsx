import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  useOldestExpenseMutation,
  useSearchExpensesMutation,
} from "../../Slices/expensesApiSlice";

import { categories, monthNames } from "../../Data/categoriesData";
import LineCategories from "../Charts/LineCategories";

import IndividualMonthExpense from "../Charts/IndividualMonthExpense";
import WalletModal from "../ExpensePage/WalletModal";
import CategoriesPie from "../Charts/CategoriesPie";
import getDatesByMonthYear from "../Calculation/Dates/getDatesByMonthYear";

const CategoricalDistro = () => {
  const { wallets } = useSelector((state) => state.wallets);
  const [walletList, setWalletList] = useState(wallets);

  const [searchExpenses, { isLoading }] = useSearchExpensesMutation();
  const [oldestExpense] = useOldestExpenseMutation();

  const [graphSwitcher, setGraphSwitcher] = useState(true);
  const [old, setOld] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExp = async () => {
      const date = await oldestExpense({
        wallets: walletList,
      }).unwrap();
      setOld(new Date(date).getFullYear());
      const expenses = await searchExpenses({
        time: getDatesByMonthYear(year, month - 1),
        categories: Object.keys(categories),
        wallets: walletList,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(expenses);
    };
    getExp();
  }, [walletList, year, month]);

  const currentYear = new Date().getFullYear();
  const yearsArray = [];
  for (let year = currentYear; year >= old; year--) {
    yearsArray.push(year);
  }

  return expenses.length === 0 ? (
    <div className="flex flex-col items-center gap-4">
      <img src="./images/fail.png" alt="" className="w-32 h-32" />
      <span className="font-semibold opacity-50">
        No expenses present in this time-frame
      </span>
      <div className="flex gap-2">
        <WalletModal
          setWalletList={setWalletList}
          walletList={walletList}
          wallets={wallets}
        />
      </div>
    </div>
  ) : (
    <>
      <div className="flex gap-2">
        <WalletModal
          setWalletList={setWalletList}
          walletList={walletList}
          wallets={wallets}
        />
        <select
          onChange={(e) => setMonth(e.target.value)}
          name="month-select"
          id="month-select"
          className="select select-bordered"
        >
          {monthNames.map((item) => {
            return (
              <option key={item} value={monthNames.indexOf(item) + 1}>
                {item}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => setYear(e.target.value)}
          defaultValue={year}
          name="year-select"
          id="year-select"
          className="select select-bordered"
        >
          {yearsArray.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col gap-2 items-center sm:items-start sm:grid sm:grid-cols-[1fr_1fr] sm:w-full rounded-xl">
        <div className="">
          <IndividualMonthExpense
            year={year}
            month={month}
            expenses={expenses}
          />
        </div>
        <div className="">
          <LineCategories year={year} month={month} expenses={expenses} />
        </div>
        <div className="">
          <CategoriesPie expenses={expenses} />
        </div>
      </div>
    </>
  );
};
export default CategoricalDistro;
