import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { categories } from "../../Data/categoriesData";

const CategoriesPie = ({ expenses }) => {
  let catList = [];
  for (let i = 0; i < expenses.length; i++) {
    if (!catList.includes(expenses[i].category))
      catList.push(expenses[i].category);
  }
  const categoriesList = catList;

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
        label: "Expense",
        data: Object.values(categoryExpenseData), // Array to hold monthly expense amounts
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default CategoriesPie;
