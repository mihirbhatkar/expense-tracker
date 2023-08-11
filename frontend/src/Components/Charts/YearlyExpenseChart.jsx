import { Line } from "react-chartjs-2";
import { Chart as ChartJS, scales } from "chart.js/auto";
import { monthNames } from "../../Data/categoriesData";

const YearlyExpenseChart = ({ expenses }) => {
  // * the first element is going to have the max month value
  const maxMonth = new Date(expenses[0].dateOfExpense).getMonth();

  const monthlyExpenses = {};
  for (let i = 0; i < maxMonth + 1; i++) monthlyExpenses[i] = 0;
  expenses.map((expense) => {
    const month = new Date(expense.dateOfExpense).getMonth();
    monthlyExpenses[month] += expense.amount;
  });

  const labelsInNumbers = Object.keys(monthlyExpenses);
  let monthLabels = [];
  for (let i = 0; i < labelsInNumbers.length; i++) {
    monthLabels.push(monthNames[i]);
  }

  const data = {
    labels: monthLabels, // holds month names
    datasets: [
      {
        label: "Monthly Expense",
        data: Object.values(monthlyExpenses), // Array to hold monthly expense amounts
        borderWidth: 2,

        borderColor: "rgba(75,192,192,1)",
        // tension: 0.4,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        border: {
          width: 4,
        },
      },
      y: {
        border: {
          width: 4,
        },
      },
    },
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
export default YearlyExpenseChart;
