import { useEffect, useState } from "react";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { categories } from "../../Data/categoriesData";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const HomePageIME = () => {
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

  let maxDate = "";
  if (month === new Date().getMonth() + 1) {
    maxDate = new Date().getDate();
  } else {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    maxDate = date;
  }
  const dailyExpenses = {};
  for (let i = 1; i <= maxDate; i++) dailyExpenses[i] = 0;
  expenses.map((expense) => {
    const day = new Date(expense.dateOfExpense).getDate();
    dailyExpenses[day] += expense.amount;
  });
  const data = {
    labels: Object.keys(dailyExpenses),
    datasets: [
      {
        label: `Day Expense`,
        data: Object.values(dailyExpenses),
      },
    ],
  };

  return <Line data={data} />;
};
export default HomePageIME;
