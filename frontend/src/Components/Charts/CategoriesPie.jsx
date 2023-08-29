import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { categories, colors } from "../../Data/categoriesData";
import { useEffect, useRef } from "react";

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
  const colorsArray = categoriesList.map((item) => colors[item]);
  const data = {
    labels: categoriesList,
    datasets: [
      {
        label: "Expense",
        data: Object.values(categoryExpenseData), // Array to hold monthly expense amounts
        backgroundColor: colorsArray,
        hoverOffset: 24,
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    // maintainAspectRatio: false,
    layout: {
      padding: 30,
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "start",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          padding: 5,
        },
      },
    },
  };

  return (
    <>
      {/* <Doughnut height={300} options={options} data={data} /> */}
      <Doughnut options={options} data={data} />
      {/* <canvas ref={pieRef} id="pie-chart" width="200" height="200"></canvas> */}
      {/* <div id="legend" className="grid grid-cols-2">
        {categoriesList.map((item) => {
          return (
            <div className="flex gap-2 items-center" key={item}>
              <input
                onChange={handleCheckboxChange}
                defaultChecked
                type="checkbox"
                id={`${item}Checkbox`}
                name={item}
                value={item}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div> */}
    </>
  );
};
export default CategoriesPie;
