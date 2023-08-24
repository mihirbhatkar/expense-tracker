import { useDispatch, useSelector } from "react-redux";
import { setSelectedWallet, setUserWallets } from "../Slices/walletsSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import {
  useCreateWalletMutation,
  useDeleteWalletMutation,
  useUpdateWalletMutation,
  useGetAllWalletsMutation,
} from "../Slices/walletsApiSlice";
import score from "../Components/Calculation/score";

const WalletsPage = () => {
  const { wallets, selectedWallet } = useSelector((state) => state.wallets);

  const [walletName, setWalletName] = useState("");
  const [walletMonthlyLimit, setWalletMonthlyLimit] = useState(
    selectedWallet.monthlyLimit
  );

  const [createWallet, { isLoading }] = useCreateWalletMutation();
  const [updateWallet] = useUpdateWalletMutation();
  const [deleteWallet] = useDeleteWalletMutation();
  const [getAllWallets] = useGetAllWalletsMutation();

  const dispatch = useDispatch();

  const changeSelectedWallet = (newWallet) => {
    setWalletName(newWallet.walletName);
    setWalletMonthlyLimit(newWallet.monthlyLimit);
    dispatch(setSelectedWallet(newWallet));
  };

  return (
    <>
      <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-bold">All wallets.</span>

          {selectedWallet &&
            wallets.map((item) => {
              const dateString = item.updatedAt;
              const date = new Date(dateString);

              const { stackScore, light, lighter, lightest } = score(
                item.monthlyLimit,
                item.currentBalance
              );

              return (
                <label htmlFor="editWalletModal" key={item._id} className="">
                  <div
                    onClick={() => changeSelectedWallet(item)}
                    className={`w-full p-4 rounded hover:bg-opacity-80 shadow-md cursor-pointer ${lighter}`}
                  >
                    <div className="flex items-center justify-between ">
                      <div className="text-sm sm:text-lg h-full flex items-center font-semibold">
                        <img
                          src={"./images/wallet.png"}
                          alt=""
                          className="w-6 h-6 mr-2 inline"
                        />
                        {item.walletName}
                      </div>

                      <div className="flex font-[800] justify-between gap-2">
                        <span className="">&#8377;{item.currentBalance}</span>/
                        <span className="opacity-40">{item.monthlyLimit}</span>
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
        </div>
        <div className="bg-base-200 rounded-xl p-4 font-semibold">
          <span className="text-3xl font-bold">Add Wallet</span>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await createWallet({
                  walletName: e.target.walletName.value,
                  monthlyLimit: e.target.monthlyLimit.value,
                });
                toast.success(res.data.message);

                const wallets = await getAllWallets();
                dispatch(setUserWallets(wallets.data));
              } catch (error) {
                toast.error(error?.data?.message || error.error);
              }
            }}
            className="flex flex-col gap-2 mt-4"
          >
            <label htmlFor="walletName">Name</label>
            <input
              name="walletName"
              id="walletName"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <label htmlFor="monthlyLimit">Monthly Limit</label>
            <input
              name="monthlyLimit"
              id="monthlyLimit"
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn btn-accent w-36 ">
              Add!
            </button>
          </form>
        </div>
      </div>

      {/* ! EDIT WALLET MODAL */}

      <input type="checkbox" id="editWalletModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className=" rounded-xl font-semibold">
            <span className="text-xl font-bold">
              Edit {selectedWallet.walletName}
            </span>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await updateWallet({
                    walletName: e.target.walletName.value,
                    monthlyLimit: e.target.changeLimit.value,
                    id: selectedWallet._id,
                  });
                  toast.success(res.data.message);
                  const wallets = await getAllWallets();
                  dispatch(setUserWallets(wallets.data));
                } catch (error) {
                  toast.error(error?.data?.message || error.error);
                }
              }}
              className="flex flex-col gap-2 mt-4"
            >
              <label htmlFor="walletName">Name</label>
              <input
                name="walletName"
                id="walletName"
                type="text"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <label htmlFor="changeLimit">Monthly Limit</label>
              <input
                name="changeLimit"
                id="changeLimit"
                type="number"
                min={0}
                value={walletMonthlyLimit}
                onChange={(e) => {
                  const input = e.target.value;
                  console.log(input === "");
                  if (isNaN(input)) return;
                  return setWalletMonthlyLimit(e.target.value);
                }}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              Last updated: {selectedWallet.updatedAt}
              <div className="space-x-2">
                <button type="submit" className="btn btn-accent  ">
                  Submit
                </button>
                <label
                  htmlFor="editWalletModal"
                  className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"
                >
                  ✕
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default WalletsPage;
