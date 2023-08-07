import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const score = balance / total;

  const calcMessage = () => {
    let msg = "";
    if (score >= 0.5) msg = "Your stackSense is great :)";
    else if (score < 0.5) msg = "Your stackSense is terrible :(";
    return msg;
  };
  const message = calcMessage();

  let senseColor = "";
  let senseWalletColor = "";
  if (score >= 0.5) {
    senseColor = "bg-emerald-500";
    senseWalletColor = "bg-emerald-300";
  } else {
    senseColor = "bg-red-500";
    senseWalletColor = "bg-red-300";
  }

  return (
    <div className={`collapse ${senseColor}`}>
      <input type="checkbox" />
      <div className="collapse-title font-bold">
        <div className="flex justify-between">
          <span>{message}</span>
          <img
            src="./images/rotatingCoin.gif"
            className="w-12 h-12 mr-[-30px]"
            alt=""
          />
        </div>
        <div className="font-medium">{balance}</div>
      </div>
      <div
        className={`collapse-content ${senseWalletColor} rounded-t-xl flex flex-col`}
      >
        {wallets.map((item) => {
          return <Wallet key={item.walletName} item={item} />;
        })}
      </div>
    </div>
  );
};

const Wallet = ({ item }) => {
  const { walletName, currentBalance, monthlyLimit } = item;

  const individualWalletScore = currentBalance / monthlyLimit;

  let walletColor = "";
  if (individualWalletScore >= 0.5) walletColor = "bg-emerald-100";
  else walletColor = "bg-red-100";

  return (
    <div className={`p-2 mt-2 ${walletColor} rounded-xl`}>
      {walletName}, rs. {currentBalance} out of {monthlyLimit}
    </div>
  );
};

export default Score;
