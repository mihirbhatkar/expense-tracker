import { useSelector } from "react-redux";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { useEffect, useState } from "react";
import { categories } from "../../Data/categoriesData";
import Loader from "../Loader";
import CategoriesPie from "../Charts/CategoriesPie";
import LineCategories from "../Charts/LineCategories";

const CategoricalDistro = () => {
  const year = 2023;
  const month = 8;

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
  const [searchExpenses, { isLoading }] = useSearchExpensesMutation();
  const [expenses, setExpenses] = useState([]);
  const categoriesList = Object.keys(categories);

  useEffect(() => {
    const getExp = async () => {
      const expenses = await searchExpenses({
        time: getDates(year, month - 1),
        categories: categoriesList,
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

  return expenses.length === 0 ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-2 items-center sm:items-start sm:grid sm:grid-cols-[1fr_1fr] rounded-xl">
      <CategoriesPie expenses={expenses} />
      <LineCategories year={year} month={month} expenses={expenses} />
    </div>
  );
};
export default CategoricalDistro;
