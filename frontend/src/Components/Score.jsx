import score from "./Calculation/score";

const Score = ({ wallets }) => {
	let balance = 0;
	for (let i = 0; i < wallets.length; i++) {
		balance += wallets[i].currentBalance;
	}
	let total = 0;
	for (let i = 0; i < wallets.length; i++) {
		total += wallets[i].monthlyLimit;
	}

	const { light, lighter, msg: message } = score(total, balance);

	return (
		<div
			className={`place-self-center ${light} shadow-md grid place-content-center rounded-[50%] w-64 h-64 `}
		>
			<div className=" font-bold flex flex-col items-center text-center gap-1 ">
				<img
					src="./images/rotatingCoin.gif"
					className="w-12 h-12"
					alt=""
				/>
				<span>{message}</span>
				<div className="font-[900] space-x-1">
					<span>&#8377;{balance}</span> /
					<span className="opacity-40">{total}</span>
				</div>
			</div>
			{/* <div className={`${lighter}  rounded flex flex-col gap-2 p-4`}>
				{wallets.map((item) => {
					return <Wallet key={item.walletName} item={item} />;
				})}
			</div> */}
		</div>
	);
};

const Wallet = ({ item }) => {
	const { walletName, currentBalance, monthlyLimit } = item;

	const { lightest, msg: message } = score(monthlyLimit, currentBalance);

	return (
		<div className={`w-full p-2 rounded shadow ${lightest}`}>
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
