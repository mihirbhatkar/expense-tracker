import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const IndividualMonthExpense = ({ expenses, year, month }) => {
	let maxDate = "";

	const currentDate = new Date();
	if (month === currentDate.getMonth()) {
		maxDate = currentDate.getDate();
	} else {
		const date = new Date(year, month, 1);
		date.setMonth(date.getMonth() + 1);
		date.setDate(date.getDate() - 1);
		maxDate = date.getDate();
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
				tension: 0.15,
			},
		],
	};
	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
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
		elements: {
			point: {
				radius: 2,
			},

			line: {
				borderWidth: 1.5,
			},
		},
	};
	return <Line options={options} data={data} />;
};
export default IndividualMonthExpense;
