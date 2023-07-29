import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MonthlyExpenses from "../Components/Charts/MonthlyExpenses";
import { useSearchExpensesMutation } from "../Slices/expensesApiSlice";
import Loader from "../Components/Loader";
import CategoriesPie from "../Components/Charts/CategoriesPie";

const ReportsPage = () => {
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

  const [expenses, setExpenses] = useState(null);

  const categoriesList = ["Transportation", "Food"];

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

  return (
    expenses && (
      <div className="lg:grid lg:grid-cols-2 flex flex-col items-center p-8 gap-4  ">
        <div className="bg-base-200 w-96">
          <MonthlyExpenses expenses={expenses} />{" "}
        </div>

        <div className="bg-base-200 w-96">
          <CategoriesPie expenses={expenses} />
        </div>
      </div>
    )
  );
};
export default ReportsPage;
