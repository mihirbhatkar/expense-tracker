import { colors } from "../../Data/categoriesData";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineCategories = ({ expenses, year, month }) => {
  // * ONLY FOR A SINGLE MONTH
  // * Y-axis = amount, X-axis = date
  let catList = [];
  for (let i = 0; i < expenses.length; i++) {
    if (!catList.includes(expenses[i].category))
      catList.push(expenses[i].category);
  }
  const categoriesList = catList;

  let maxDate = "";
  if (month === new Date().getMonth() + 1) {
    maxDate = new Date().getDate();
  } else {
    const date = new Date(year, month, 1);
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);
    maxDate = date;
  }

  const categoryExpenses = {}; // each category will have dailyExpense

  const dailyExpenses = {};
  for (let i = 1; i <= maxDate; i++) dailyExpenses[i] = 0;

  for (let i = 0; i < categoriesList.length; i++) {
    categoryExpenses[categoriesList[i]] = { ...dailyExpenses };
  }

  expenses.map((item) => {
    const day = new Date(item.dateOfExpense).getDate();
    console.log(categoryExpenses[item.category]);
    categoryExpenses[item.category][day] += item.amount;
  });

  const datasetsArray = [];
  for (let i = 0; i < categoriesList.length; i++) {
    console.log(categoryExpenses[categoriesList[i]]);
    datasetsArray.push({
      label: `${categoriesList[i]}`,
      data: Object.values(categoryExpenses[categoriesList[i]]),
      borderWidth: 2,
      borderColor: colors[i],
    });
  }
  console.log(...datasetsArray);
  const data = {
    labels: Object.keys(dailyExpenses),
    datasets: [...datasetsArray],
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
      <Line data={data} options={options} />
    </div>
  );
};
export default LineCategories;
