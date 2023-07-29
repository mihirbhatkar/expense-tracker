import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const MonthlyExpenses = ({ expenses }) => {
  // Prepare the data for the chart
  // ! the first element is going to have the max month value
  const maxMonth = new Date(expenses[0].dateOfExpense).getMonth();

  const monthlyExpenses = {};

  for (let i = 0; i < maxMonth + 1; i++) monthlyExpenses[i] = 0;

  expenses.map((expense) => {
    const month = new Date(expense.dateOfExpense).getMonth();
    monthlyExpenses[month] += expense.amount;
  });
  // const months = ["Jan", "Feb"]
  const data = {
    labels: Object.keys(monthlyExpenses), // holds month names
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyExpenses), // Array to hold monthly expense amounts
        // fill: false,
        // borderColor: "rgba(75,192,192,1)",
        // tension: 0.4,
      },
    ],
  };

  const [chartData, setChartData] = useState(data);

  return (
    <div className="">
      <Line data={chartData} />
    </div>
  );
};
export default MonthlyExpenses;
