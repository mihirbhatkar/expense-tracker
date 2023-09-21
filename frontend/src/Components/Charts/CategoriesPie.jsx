import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { colors } from "../../Data/categoriesData";

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
		layout: {
			padding: 10,
		},
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				align: "start",
				labels: {
					boxWidth: 10,
					boxHeight: 10,
					padding: 15,
				},
			},
		},
	};

	return (
		<>
			<Pie options={options} data={data} />
		</>
	);
};
export default CategoriesPie;
