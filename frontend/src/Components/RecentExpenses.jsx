import { useEffect, useState } from "react";
import { useGetRecentExpensesMutation } from "../Slices/expensesApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { categories, monthNames, dayNames } from "../Data/categoriesData";
import { Link } from "react-router-dom";
import modalColor from "./Calculation/modalColor";
import { images } from "../Data/categoriesData";
import { toast } from "react-toastify";

import { GoDotFill } from "react-icons/go";

const RecentExpenses = () => {
	const { wallets } = useSelector((state) => state.wallets);

	let walletNames = {};
	for (let i = 0; i < wallets.length; i++) {
		walletNames[`${wallets[i]._id}`] = wallets[i].walletName;
	}

	const [expenses, setExpenses] = useState([]);
	const [getRecentExpenses, { isLoading }] = useGetRecentExpensesMutation();

	useEffect(() => {
		const getExpenses = async () => {
			try {
				const exp = await getRecentExpenses().unwrap();

				setExpenses(exp.recentExpenses.slice(0, 3));
			} catch (error) {
				console.log(error);
				toast.error(error);
			}
		};
		getExpenses();
	}, [wallets]);

	return (
		<div className="p-4 bg-base-300 shadow-md rounded-xl">
			<div className="mb-4 flex items-center justify-between">
				<div className="font-extrabold text-xl ">Recent Expenses.</div>
				<Link to="/expenses" className="text-sm underline">
					See all
				</Link>
			</div>
			<div className="flex flex-col gap-2">
				{isLoading ? (
					<Loader />
				) : (
					expenses.map((item) => {
						const dateString = item.dateOfExpense;
						const date = new Date(dateString);
						const month = monthNames[date.getMonth()];
						const year = date.getFullYear();
						const day = date.getDate();
						// const weekday = dayNames[date.getDay()];
						const bgColor = modalColor(item.category);
						return (
							<div
								key={item._id}
								className="flex flex-col min-w-full items-center gap-4 "
							>
								<div className={`${bgColor} rounded-lg w-full`}>
									<div className="grid grid-cols-[48px_auto] items-center gap-1 p-2">
										<img
											src={images[item.category]}
											alt=""
											className="w-10 h-10 inline"
										/>
										<div className="text-left flex justify-between items-center">
											<div>
												<h1 className="sm:text-lg font-bold flex items-center gap-1">
													{item.description}{" "}
													<span className="inline">
														<GoDotFill />
													</span>
													<span className="opacity-50 text-sm font-bold">
														{
															walletNames[
																item.walletId
															]
														}
													</span>
												</h1>
												<h2 className="font-semibold opacity-50">
													<div className="italic font-semibold text-left">
														{day} {month}, {year}{" "}
														<br />
													</div>
												</h2>
											</div>
											<span
												className=" font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)]
				"
											>
												&#8377;{item.amount}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};
export default RecentExpenses;
