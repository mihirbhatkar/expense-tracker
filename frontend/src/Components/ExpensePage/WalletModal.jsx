import { AiOutlineWallet } from "react-icons/ai";

const WalletModal = ({ wallets, setWalletList, walletList }) => {
  return (
    <>
      <button
        className="flex justify-center items-center gap-1 rounded-xl font-semibold p-2 border-sky-300 border-4 bg-sky-300/60 text-lg hover:bg-sky-300 transition-all"
        onClick={() => window.walletModal.showModal()}
      >
        <AiOutlineWallet />{" "}
        {walletList.length > 1 ? "All wallets" : walletList[0].walletName}
      </button>
      <dialog id="walletModal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box p-10">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold underline underline-offset-8 mb-4">
              Select wallet.
            </h3>
            <button
              className={`btn ${walletList.length !== 1 && "btn-neutral"} `}
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
