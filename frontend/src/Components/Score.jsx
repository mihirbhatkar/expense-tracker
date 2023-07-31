import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Score = () => {
  const { wallets } = useSelector((state) => state.wallets);
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

  const [balance, setBalance] = useState(getCurrentBalance());
  const [total, setTotal] = useState(getTotal());

  const calcMessage = () => {
    let msg = "";
    let score = balance / total;
    if (score >= 0.5) msg = "Your stackSense is great :)";
    else if (score < 0.5) msg = "Your stackSense is terrible :(";
    return msg;
  };

  const [message, setMessage] = useState(calcMessage());
  // useEffect(() => {
  //   let msg = "";
  //   let score = balance / total;
  //   if (score >= 0.5) msg = "Your stackSense is great :)";
  //   else if (score < 0.5) msg = "Your stackSense is terrible :(";
  //   return msg;
  // }, [wallets]);

  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title font-medium">
        {message} <br />
        {balance}/{total}
      </div>
      <div className="collapse-content flex flex-col ">
        {wallets.map((item) => {
          return <Wallet item={item} />;
        })}
      </div>
    </div>
  );
};

const Wallet = ({ item }) => {
  const { walletName } = item;

  return <span>{walletName}</span>;
};

export default Score;
