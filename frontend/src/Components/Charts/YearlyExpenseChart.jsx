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
      },
    ],
  };
  const options = {
    // maintainAspectRatio: false,
    scales: {
      x: {
        border: {
          width: 2,
          color: "darkslategrey",
        },
        grid: {
          color: "lightgrey",
          width: 1,
        },
      },
      y: {
        border: {
          width: 2,
          color: "grey",
        },
        grid: {
          color: "lightgrey",
          width: 0.5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      animations: false,
    },
  };

  return (
    <Line
      // width={window.innerWidth > 640 ? 640 : 200}
      // height={window.innerWidth > 640 ? 400 : 200}
      options={options}
      data={data}
    />
  );
};
export default YearlyExpenseChart;
