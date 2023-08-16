import { categories, monthNames } from "../../Data/categoriesData";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "../Loader";

const IndividualMonthExpense = ({ expenses, year, month }) => {
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
export default IndividualMonthExpense;
