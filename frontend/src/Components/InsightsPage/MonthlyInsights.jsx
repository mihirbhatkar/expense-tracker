import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
	useOldestExpenseMutation,
	useSearchExpensesMutation,
} from "../../Slices/expensesApiSlice";

import { categories, monthNames } from "../../Data/categoriesData";
import LineCategories from "../Charts/LineCategories";

import IndividualMonthExpense from "../Charts/IndividualMonthExpense";
import WalletModal from "../ExpensePage/WalletModal";
import CategoriesPie from "../Charts/CategoriesPie";
import getDatesByMonthYear from "../Calculation/Dates/getDatesByMonthYear";
import Loader from "../Loader";
import { toast } from "react-toastify";

const MonthlyInsights = () => {
	const { wallets } = useSelector((state) => state.wallets);
	const [walletList, setWalletList] = useState(wallets);

	const [searchExpenses] = useSearchExpensesMutation();
	const [oldestExpense] = useOldestExpenseMutation();

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const [graphSwitcher, setGraphSwitcher] = useState("0");
	const [old, setOld] = useState({ month: currentMonth, year: currentYear });
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getExpenses = async () => {
			try {
				const date = await oldestExpense({
					wallets: walletList,
				}).unwrap();
				const oldDate = new Date(date);
				setOld({
					month: oldDate.getMonth(),
					year: oldDate.getFullYear(),
				});
				const expenses = await searchExpenses({
					time: getDatesByMonthYear(Number(year), Number(month)),
					categories: Object.keys(categories),
					wallets: walletList,
					amount: {
						lower: 0,
						upper: 100000,
					},
				}).unwrap();
				setExpenses(expenses);
				setLoading(false);
			} catch (err) {
				console.log(err);
				toast.error(err);
			}
		};
		getExpenses();
	}, [walletList, year, month]);

	if (loading) {
		return <Loader />;
	}

	const yearsArray = [];
	for (let year = currentYear; year >= old.year; year--) {
		yearsArray.push(year);
	}

	const monthsList = {};
	if (year == currentYear && old.year == currentYear) {
		for (let month = old.month; month <= currentMonth; month++) {
			monthsList[month] = monthNames[month];
		}
	} else if (year == currentYear && old.year != currentYear) {
		for (let month = 0; month <= currentMonth; month++) {
			monthsList[month] = monthNames[month];
		}
	} else if (year != currentYear && old.year == year) {
		for (let month = old.month; month <= 11; month++) {
			monthsList[month] = monthNames[month];
		}
	} else {
		for (let month = 0; month <= 11; month++) {
			monthsList[month] = monthNames[month];
		}
	}
	return expenses.length === 0 ? (
		<div className="flex flex-col items-center gap-4">
			<img src="./images/fail.png" alt="" className="w-32 h-32" />
			<span className="font-semibold opacity-50">
				No expenses present in this time-frame
			</span>
			<ChartInput
				setWalletList={setWalletList}
				walletList={walletList}
				wallets={wallets}
				monthsList={monthsList}
				setMonth={setMonth}
				month={month}
				setYear={setYear}
				year={year}
				yearsArray={yearsArray}
			/>
		</div>
	) : (
		<>
			<div className="flex flex-col gap-2 items-center sm:items-start sm:grid sm:grid-cols-[5fr_2fr] sm:w-full rounded-xl">
				<div className="flex flex-col gap-2 w-full">
					<h2 className="text-xl font-bold  underline underline-offset-2 mb-1">
						{monthNames[month]} expenses
					</h2>

					<div className="flex gap-2">
						<input
							type="radio"
							value="0"
							name="radio_input"
							className="radio"
							id="total_id_radio"
							onChange={(e) => setGraphSwitcher(e.target.value)}
							defaultChecked
						/>
						<label htmlFor="total_id_radio">Total</label>
						<input
							type="radio"
							value="1"
							name="radio_input"
							className="radio"
							onChange={(e) => setGraphSwitcher(e.target.value)}
							id="cat_breakdown_radio"
						/>
						<label htmlFor="cat_breakdown_radio">
							Category Breakdown
						</label>
					</div>
					{graphSwitcher === "0" ? (
						<>
							<div className="w-[99%]">
								<IndividualMonthExpense
									year={year}
									month={month}
									expenses={expenses}
								/>
							</div>
						</>
					) : (
						<>
							<div className="w-[99%]">
								<LineCategories
									year={year}
									month={month}
									expenses={expenses}
								/>
							</div>
						</>
					)}
				</div>

				<div className="w-full">
					<h2 className="text-xl font-bold  underline underline-offset-2 mb-1">
						Category Distribution
					</h2>

					<CategoriesPie expenses={expenses} />
				</div>
			</div>
			<ChartInput
				setWalletList={setWalletList}
				walletList={walletList}
				wallets={wallets}
				monthsList={monthsList}
				setMonth={setMonth}
				month={month}
				setYear={setYear}
				year={year}
				yearsArray={yearsArray}
			/>
		</>
	);
};
export default MonthlyInsights;

const ChartInput = ({
	monthsList,
	setWalletList,
	walletList,
	wallets,
	setMonth,
	month,
	setYear,
	year,
	yearsArray,
}) => {
	return (
		<div className="flex gap-2 flex-wrap justify-center">
			<WalletModal
				setWalletList={setWalletList}
				walletList={walletList}
				wallets={wallets}
			/>

			<select
				onChange={(e) => setMonth(e.target.value)}
				defaultValue={month}
				name="month-select"
				id="month-select"
				className="select select-bordered"
			>
				{Object.keys(monthsList).map((item) => {
					return (
						<option key={item} value={Number(item)}>
							{monthsList[item]}
						</option>
					);
				})}
			</select>
			<select
				onChange={(e) => setYear(e.target.value)}
				defaultValue={year}
				name="year-select"
				id="year-select"
				className="select select-bordered"
			>
				{yearsArray.map((item) => {
					return (
						<option key={item} value={item}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};
