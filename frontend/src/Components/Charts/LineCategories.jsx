import { colors } from "../../Data/categoriesData";
import { Bar, Line, Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useRef } from "react";

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
	let currentDate = new Date();
	if (month === currentDate.getMonth() + 1) {
		maxDate = currentDate.getDate();
	} else {
		const date = new Date(year, month, 1);
		date.setMonth(date.getMonth() + 1);
		date.setDate(date.getDate() - 1);
		maxDate = date.getDate();
	}

	const categoryExpenses = {}; // each category will have dailyExpense

	const dailyExpenses = {};
	for (let i = 1; i <= maxDate; i++) dailyExpenses[i] = 0;

	for (let i = 0; i < categoriesList.length; i++) {
		categoryExpenses[categoriesList[i]] = { ...dailyExpenses };
	}

	expenses.map((item) => {
		const day = new Date(item.dateOfExpense).getDate();
		categoryExpenses[item.category][day] += item.amount;
	});

	const datasetsArray = [];
	for (let i = 0; i < categoriesList.length; i++) {
		datasetsArray.push({
			label: `${categoriesList[i]}`,
			data: Object.values(categoryExpenses[categoriesList[i]]),
			borderColor: colors[categoriesList[i]],
			tension: 0.15,
		});
	}

	const data = {
		labels: Object.keys(dailyExpenses),
		datasets: datasetsArray,
	};
	const options = {
		animation: {
			onComplete: () => {
				delayed: true;
			},
			delay: (context) => {
				let delay = 0;
				if (context.type === "data" && context.mode === "default") {
					delay = context.dataIndex * 50;
				}
				return delay;
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
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
		elements: {
			point: {
				pointStyle: false,
				radius: 2,
			},

			line: {
				borderWidth: 1.5,
			},
		},
	};

	const chartRef = useRef(null);
	// const config = {
	// 	type: "line",
	// 	data: data,
	// 	options: options,
	// };

	// useEffect(() => {
	// 	const ctx = document.getElementById("myChart").getContext("2d");
	// 	const chart = new ChartJS(ctx, config);

	// 	chartRef.current = chart;

	// 	return () => {
	// 		chart.destroy();
	// 	};
	// });

	return (
		<>
			<Line ref={chartRef} data={data} options={options} />

			{/* <canvas id="myChart"></canvas> */}

			<div className="flex flex-wrap gap-2 pt-1">
				{datasetsArray.map((item, index) => {
					return (
						<div
							key={item.label}
							className="flex items-center gap-1 "
						>
							<input
								onChange={(e) => {
									const index = e.target.value;
									if (
										chartRef.current.isDatasetVisible(index)
										// chart.isDatasetVisible(index)
									) {
										chartRef.current.hide(index);
									} else {
										chartRef.current.show(index);
									}
								}}
								type="checkbox"
								className="checkbox checkbox-neutral checkbox-xs sm:checkbox-sm"
								value={index}
								name={item.label}
								id={item.label}
								defaultChecked
							/>
							<label
								className="sm:label-text label-text-alt label p-[0.5px]"
								htmlFor={item.label}
							>
								{item.label}
							</label>
						</div>
					);
				})}
			</div>
		</>
	);
};
export default LineCategories;
