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
const WalletsPage = () => {
  const { wallets, selectedWallet } = useSelector((state) => state.wallets);

  const [walletName, setWalletName] = useState(selectedWallet.walletName);
  const [amount, setAmount] = useState(0);

  const [createWallet, { isLoading }] = useCreateWalletMutation();
  const [updateWallet] = useUpdateWalletMutation();
  const [deleteWallet] = useDeleteWalletMutation();
  const [getAllWallets] = useGetAllWalletsMutation();

  const dispatch = useDispatch();

  const changeSelectedWallet = (newWallet) => {
    setWalletName(newWallet.walletName);
    dispatch(setSelectedWallet(newWallet));
  };

  return (
    <>
      <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 text-lg p-8">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-bold">All wallets.</span>
          {wallets.map((item) => {
            const dateString = item.updatedAt;
            const date = new Date(dateString);

            return (
              <label htmlFor="my_modal_6" className="text-2xl font-semibold">
                <div
                  onClick={() => changeSelectedWallet(item)}
                  key={item._id}
                  className="flex h-20 btn flex-col bg-base-200 rounded-xl min-w-full items-center gap-4"
                >
                  <div className="rounded-xl w-full p-4">
                    <div className="flex items-center justify-between">
                      {item.walletName}
                      <span className="text-xl font-semibold">
                        &#8377;{item.currentBalance}
                      </span>
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
              console.log(e.target.walletName.value);
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

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="bg-base-200 rounded-xl p-4 font-semibold">
            <span className="text-3xl font-bold">Edit Wallet</span>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await updateWallet({
                    walletName: e.target.walletName.value,
                    addAmount: e.target.addAmount.value,
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
                className="input input-bordered w-full max-w-xs"
              />
              <label htmlFor="addAmount">Add Amount</label>
              <input
                name="addAmount"
                id="addAmount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              Other wallet info...
              <div className="space-x-2">
                <button type="submit" className="btn btn-accent w-36 ">
                  Add Amount
                </button>
                <label htmlFor="my_modal_6" className="btn w-36 btn-neutral ">
                  Close!
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
