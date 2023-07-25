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
    <div className="dropdown dropdown-bottom dropdown-end ">
      <label tabIndex={0} className="btn bg-base-200 m-1">
        <AiFillCaretDown />
        {selectedWallet.walletName}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
      >
        {wallets.map((item) => {
          return (
            <li key={item._id}>
              <div onClick={() => changeSelectedWallet(item)}>
                {item.walletName}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default WalletSelector;
