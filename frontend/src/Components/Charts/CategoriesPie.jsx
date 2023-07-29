import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CategoriesPie = ({ expenses }) => {
  const maxMonth = new Date(expenses[0].dateOfExpense).getMonth();
  const categoriesList = ["Transportation", "Food"];

  const categoryExpenseData = {};
  for (let i = 0; i < categoriesList.length; i++)
    categoryExpenseData[categoriesList[i]] = 0;

  expenses.forEach((item) => {
    categoryExpenseData[item.category] += item.amount;
  });

  const data = {
    labels: categoriesList,
    datasets: [
      {
        label: "Category Expense",
        data: Object.values(categoryExpenseData), // Array to hold monthly expense amounts
      },
    ],
  };

  const [chartData, setChartData] = useState(data);

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default CategoriesPie;
