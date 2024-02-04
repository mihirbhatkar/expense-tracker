import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import score from "./Calculation/score";

const Score = ({ wallets }) => {
	const getCurrentBalance = () => {
		let balanceSum = 0;
		for (let i = 0; i < wallets.length; i++) {
			balanceSum += wallets[i].currentBalance;
		}
		return balanceSum;
	};
	const getTotal = () => {
		let total = 0;
		for (let i = 0; i < wallets.length; i++) {
			total += wallets[i].monthlyLimit;
		}
		return total;
	};

	const balance = getCurrentBalance();
	const total = getTotal();

	const { light, lighter, msg: message } = score(total, balance);

	return (
		<div className={`collapse ${light} shadow-md text-black`}>
			<input type="checkbox" />
			<div className="collapse-title font-bold">
				<div className="flex justify-between text-xl font-extrabold">
					<span>{message}</span>
					<img
						src="./images/rotatingCoin.gif"
						className="w-12 h-12 mr-[-30px]"
						alt=""
					/>
				</div>
				<div className="font-[900] space-x-1">
					<span>&#8377;{balance}</span> /
					<span className="opacity-40">{total}</span>
				</div>
			</div>
			<div
				className={`collapse-content ${lighter} rounded-t-xl flex flex-col gap-2 p-4`}
			>
				<span className="text-sm font-bold">Recently used:</span>
				{wallets.map((item) => {
					return <Wallet key={item.walletName} item={item} />;
				})}
			</div>
		</div>
	);
};

const Wallet = ({ item }) => {
	const { walletName, currentBalance, monthlyLimit } = item;

	const { lightest, msg: message } = score(monthlyLimit, currentBalance);

	return (
		<div className={`w-full p-3 rounded-xl shadow ${lightest}`}>
			<div className="flex items-center justify-between ">
				<div className="text-sm sm:text-lg h-full flex items-center">
					<img
						src={"./images/wallet.png"}
						alt=""
						className="w-6 h-6 mr-2 inline"
					/>
					{walletName}
				</div>

				<div className="flex font-bold text-sm justify-between gap-2">
					<span className="">&#8377;{currentBalance}</span>/
					<span className="opacity-40">{monthlyLimit}</span>
				</div>
			</div>
		</div>
	);
};

export default Score;
