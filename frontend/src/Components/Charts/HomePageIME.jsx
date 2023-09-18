import { useEffect, useState } from "react";
import { useSearchExpensesMutation } from "../../Slices/expensesApiSlice";
import { categories } from "../../Data/categoriesData";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import get30daysDates from "../Calculation/Dates/get30daysDates";
import Loader from "../Loader";

const HomePageIME = () => {
	const { wallets } = useSelector((state) => state.wallets);
	const [expenses, setExpenses] = useState([]);
	const [searchExpenses, { isLoading }] = useSearchExpensesMutation();

	useEffect(() => {
		const getExpenses = async () => {
			try {
				const expenses = await searchExpenses({
					time: get30daysDates(),
					categories: Object.keys(categories),
					wallets: wallets,
					amount: {
						lower: 0,
						upper: 100000,
					},
				}).unwrap();
				setExpenses(expenses);
			} catch (error) {
				console.log(error);
			}
		};
		getExpenses();
	}, [wallets]);

	if (isLoading) {
		return <Loader />;
	}
	const dateRange = get30daysDates();
	const maxDate = dateRange.end;
	const minDate = dateRange.start;

	const dailyExpenses = {};

	if (maxDate.getMonth() !== minDate.getMonth()) {
		// for min date
		const nextMonth = new Date();
		nextMonth.setMonth(minDate.getMonth()); // Set the month to the desired month
		nextMonth.setDate(1); // Set the day to the first day of the month
		nextMonth.setDate(nextMonth.getDate() - 1);

		const minDateMonth = minDate.getMonth();
		const maxDateMonth = maxDate.getMonth();
		for (let i = minDate.getDate(); i <= nextMonth.getDate(); i++)
			dailyExpenses[`${i}/${minDateMonth}`] = 0;
		for (let i = 1; i <= maxDate.getDate(); i++)
			dailyExpenses[`${i}/${maxDateMonth}`] = 0;
	} else {
		for (let i = minDate.getDate(); i <= maxDate.getDate(); i++)
			dailyExpenses[`${i}/${maxDate.getMonth()}`] = 0;
	}

	expenses.map((expense) => {
		const date = new Date(expense.dateOfExpense);
		const day = date.getDate();
		dailyExpenses[`${day}/${date.getMonth()}`] += expense.amount;
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
		maintainAspectRatio: false,
		elements: {
			point: {
				pointStyle: false,
			},
		},
	};
	return (
		<Line
			// width={1000}
			height={250}
			options={options}
			data={data}
		/>
	);
};
export default HomePageIME;
