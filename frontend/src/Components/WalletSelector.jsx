import { useDispatch, useSelector } from "react-redux";
import { setSelectedWallet } from "../Slices/walletsSlice";
import { AiFillCaretDown } from "react-icons/ai";

const WalletSelector = () => {
	const { wallets, selectedWallet } = useSelector((state) => state.wallets);
	const dispatch = useDispatch();

	return (
		selectedWallet && (
			<>
				<select
					className=" select select-bordered w-full rounded"
					onChange={(e) =>
						dispatch(setSelectedWallet(JSON.parse(e.target.value)))
					}
					name={selectedWallet.walletName}
				>
					{wallets.map((item) => {
						return (
							<option key={item._id} value={JSON.stringify(item)}>
								💳
								{item.walletName}
							</option>
						);
					})}
				</select>
			</>
		)
	);
};
export default WalletSelector;
