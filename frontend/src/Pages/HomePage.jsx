import { useSelector } from "react-redux";
import RecentExpenses from "../Components/RecentExpenses.jsx";
import Score from "../Components/Score.jsx";
import { Link } from "react-router-dom";
import HomePageIME from "../Components/Charts/HomePageIME.jsx";

const HomePage = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { wallets } = useSelector((state) => state.wallets);
	return userInfo ? (
		wallets.length === 0 ? (
			<div className="p-4 max-w-2xl mx-auto lg:max-w-full flex flex-col ">
				<p className="self-center text-center text-xl space-y-4 mt-16">
					<img
						src="./images/no-results.png"
						className="w-48 h-48 mx-auto mb-2"
						alt=""
					/>
					You have no wallets 😓 <br />
					<Link
						className="btn btn-accent font-extrabold"
						to="/wallets"
					>
						Add a wallet to get started!
					</Link>
				</p>
			</div>
		) : (
			<>
				<div className="p-4 max-w-2xl mx-auto lg:max-w-full lg:grid lg:grid-cols-[1fr_auto]  lg:justify-self-center gap-4 flex flex-col-reverse">
					<div className=" rounded-xl p-1 drop-shadow-md flex flex-col items-center">
						<div className="flex w-full items-center justify-between p-3">
							<div className="font-extrabold text-xl">
								Last 30 days' trend
							</div>
							<Link to="/insights" className="text-sm underline">
								All insights
							</Link>
						</div>
						<div className="w-[99%]">
							<HomePageIME />
						</div>
					</div>
					<Score wallets={wallets} />
				</div>
				<div className="px-4 max-w-2xl mx-auto lg:max-w-full lg:grid lg:grid-cols-2 lg:justify-self-center gap-4 flex flex-col ">
					<RecentExpenses />
				</div>
			</>
		)
	) : (
		<div className="text-center flex justify-center items-center flex-col min-h-[var(--min-page-height)] text-4xl font-bold">
			<div className="mb-[var(--navbar-height)] lg:gap-16 flex lg:flex-row flex-col items-center justify-center">
				<div>
					<img
						src="./images/dollar.png"
						className="w-36 h-36 mx-auto"
						alt=""
					/>

					<h1 className="text-6xl font-extrabold hidden lg:block ">
						stackSense!
					</h1>
				</div>
				<div className="lg:w-96 flex flex-col items-center gap-4">
					<div>
						Financial{" "}
						<span className="text-emerald-500">finesse</span> <br />{" "}
						at your fingertips.
					</div>
					<div className="text-xl font-light opacity-50 w-3/4">
						Your go-to expense tracker web app for mastering your
						finances. Effortlessly manage expenses, gain financial
						insights, and stack up your savings for a brighter
						future
					</div>
				</div>
			</div>
		</div>
	);
};
export default HomePage;
