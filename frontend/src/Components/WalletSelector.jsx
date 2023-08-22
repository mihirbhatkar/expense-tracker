import { useDispatch, useSelector } from "react-redux";
import { setSelectedWallet } from "../Slices/walletsSlice";
import { AiFillCaretDown } from "react-icons/ai";

const WalletSelector = () => {
  const { wallets, selectedWallet } = useSelector((state) => state.wallets);
  const dispatch = useDispatch();

  const changeSelectedWallet = (newWallet) => {
    dispatch(setSelectedWallet(newWallet));
  };

  return (
    selectedWallet && (
      <>
        <select
          className=" select select-bordered w-full rounded"
          name={selectedWallet.walletName}
          id=""
        >
          {wallets.map((item) => {
            return (
              <option
                onClick={() => changeSelectedWallet(item)}
                key={item._id}
                value=""
              >
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
