import { AiOutlineWallet } from "react-icons/ai";

const WalletModal = ({ wallets, setWalletList, walletList }) => {
	return (
		<>
			<button
				className="btn btn-accent normal-case font-bold "
				onClick={() => window.walletModal.showModal()}
			>
				<AiOutlineWallet />{" "}
				<span className="text-sm sm:text-lg">
					{walletList.length > 1
						? "All wallets"
						: walletList[0].walletName}
				</span>
			</button>
			<dialog
				id="walletModal"
				className="modal modal-bottom sm:modal-middle"
			>
				<form method="dialog" className="modal-box p-10">
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
						✕
					</button>
					<div className="flex flex-col gap-1">
						<h3 className="text-xl font-bold underline underline-offset-8 mb-4">
							Select wallet.
						</h3>
						<button
							className={`btn ${
								walletList.length !== 1 && "btn-neutral"
							} `}
							onClick={() => setWalletList(wallets)}
						>
							All wallets
						</button>
						{wallets.map((item) => {
							return (
								<button
									className={`btn ${
										walletList.length === 1 &&
										item._id === walletList[0]._id &&
										"btn-neutral"
									}`}
									key={item._id}
									onClick={() => setWalletList([item])}
								>
									{item.walletName}
								</button>
							);
						})}
					</div>
				</form>
			</dialog>
		</>
	);
};
export default WalletModal;
