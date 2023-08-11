import { useSelector } from "react-redux";
import YearlyExpenseChart from "../Charts/YearlyExpenseChart";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { useEffect, useState } from "react";
import { categories } from "../../Data/categoriesData";
import Loader from "../Loader";
import CategoriesPie from "../Charts/CategoriesPie";
import TimeModal from "../ExpensePage/TimeModal";
import WalletModal from "../ExpensePage/WalletModal";

const YearlyExpenses = () => {
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
  const { wallets } = useSelector((state) => state.wallets);
  const [searchExpenses, { isLoading }] = useSearchExpensesMutation();
  const [expenses, setExpenses] = useState([]);
  const categoriesList = Object.keys(categories);
  const [walletList, setWalletList] = useState(wallets);

  useEffect(() => {
    const getExp = async () => {
      const res = await searchExpenses({
        time: getDates(11),
        categories: categoriesList,
        wallets: walletList,
        amount: {
          lower: 0,
          upper: 100000,
        },
      }).unwrap();
      setExpenses(res);
    };
    getExp();
  }, [walletList]);

  return expenses.length === 0 ? (
    <Loader />
  ) : (
    <>
      <div className="flex flex-col sm:flex-row">
        <YearlyExpenseChart expenses={expenses} />
        <CategoriesPie expenses={expenses} />
      </div>
      <WalletModal
        setWalletList={setWalletList}
        walletList={walletList}
        wallets={wallets}
      />
    </>
  );
};
export default YearlyExpenses;
