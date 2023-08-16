import { useSelector } from "react-redux";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { useEffect, useState } from "react";
import { categories } from "../../Data/categoriesData";
import Loader from "../Loader";
import LineCategories from "../Charts/LineCategories";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import IndividualMonthExpense from "../Charts/IndividualMonthExpense";

const CategoricalDistro = () => {
  function getDates(year, month) {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    return {
      start: new Date(year, month, 1),
      end: date,
    };
  }
  const { wallets } = useSelector((state) => state.wallets);
  const [searchExpenses] = useSearchExpensesMutation();

  const [walletList, setWalletList] = useState(wallets);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [expenses, setExpenses] = useState([]);
  const categoriesList = Object.keys(categories);

  useEffect(() => {
    const getExp = async () => {
      const expenses = await searchExpenses({
        time: getDates(year, month - 1),
        categories: categoriesList,
        wallets: walletList,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(expenses);
    };
    getExp();
  }, [walletList]);

  return expenses.length === 0 ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col gap-2 items-center sm:items-start sm:grid sm:grid-cols-[1fr_1fr] rounded-xl">
        <div>
          <IndividualMonthExpense
            year={year}
            month={month}
            expenses={expenses}
          />
        </div>
        <div>
          <LineCategories year={year} month={month} expenses={expenses} />
        </div>
      </div>
      <div></div>
    </>
  );
};
export default CategoricalDistro;
