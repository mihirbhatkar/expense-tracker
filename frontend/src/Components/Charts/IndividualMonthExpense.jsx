import { categories, monthNames } from "../../Data/categoriesData";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const IndividualMonthExpense = ({ year, month }) => {
  const { wallets } = useSelector((state) => state.wallets);
  const [customLoading, setCustomLoading] = useState(true);

  const [searchExpenses] = useSearchExpensesMutation();

  let maxDate = "";
  if (month === new Date().getMonth() + 1) {
    maxDate = new Date().getDate();
  } else {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    maxDate = date;
  }

  function getDates(year, month) {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    return {
      start: new Date(year, month, 1),
      end: date,
    };
  }
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
            label: `This month's Expenses`,
            data: Object.values(dailyExpenses),
          },
        ],
      };
      setChartData(data);
      setCustomLoading(false);
    };
    getExp();
  }, [wallets]);

  const [chartData, setChartData] = useState(null);
  if (customLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader></Loader>
      </div>
    );
  } else {
    return <Line data={chartData} />;
  }
};
export default IndividualMonthExpense;
