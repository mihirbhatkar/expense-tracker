import { useSelector } from "react-redux";
import YearlyExpenseChart from "../Charts/YearlyExpenseChart";
import {
  useOldestExpenseMutation,
  useSearchExpensesMutation,
} from "../../Slices/expensesApiSlice";
import { useEffect, useState } from "react";
import { categories } from "../../Data/categoriesData";
import Loader from "../Loader";
import CategoriesPie from "../Charts/CategoriesPie";
import WalletModal from "../ExpensePage/WalletModal";
import getDatesByYear from "../Calculation/Dates/getDatesByYear";

const YearlyExpenses = () => {
  const { wallets } = useSelector((state) => state.wallets);
  const [searchExpenses, { isLoading }] = useSearchExpensesMutation();
  const [oldestExpense] = useOldestExpenseMutation();
  const [expenses, setExpenses] = useState([]);
  const [walletList, setWalletList] = useState(wallets);
  const [old, setOld] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const getExp = async () => {
      const date = await oldestExpense({
        wallets: walletList,
      }).unwrap();
      setOld(new Date(date).getFullYear());

      const res = await searchExpenses({
        time: getDatesByYear(year),
        categories: Object.keys(categories),
        wallets: walletList,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(res);
    };
    getExp();
  }, [walletList, year]);

  if (isLoading) {
    return <Loader />;
  }

  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: currentYear - old + 1 },
    (_, index) => currentYear - index
  );
  return expenses.length == 0 ? (
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
    </div>
  ) : (
    <>
      <div className="flex gap-2 w-full justify-center">
        <WalletModal
          setWalletList={setWalletList}
          walletList={walletList}
          wallets={wallets}
        />
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

      <div className="text-xl font-bold flex flex-col gap-2 items-stretch w-full sm:grid sm:grid-rows-none sm:grid-cols-[5fr_2fr] sm:items-start ">
        <div className="">
          <h2 className="w-full underline underline-offset-2 mb-1">
            {year}'s expenses
          </h2>

          <div className="w-[99.9%]">
            <YearlyExpenseChart expenses={expenses} />
          </div>
        </div>
        <div>
          <h2 className="underline underline-offset-2 mb-1">
            Category Distribution
          </h2>
          <div className="w-[99.9%]">
            <CategoriesPie expenses={expenses} />
          </div>
        </div>
      </div>
    </>
  );
};
export default YearlyExpenses;
