import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Score = () => {
  const { wallets } = useSelector((state) => state.wallets);
  //   const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let balanceSum = 0;
    let totalSum = 0;
    for (let i = 0; i < wallets.length; i++) {
      balanceSum += wallets[i].currentBalance;
      totalSum += wallets[i].monthlyLimit;
    }
    // setScore(balanceSum / totalSum);
    let msg = "";
    if (balanceSum / totalSum >= 0.5) msg = "Your stackSense is great :)";
    else if (balanceSum / totalSum < 0.5)
      msg = "Your stackSense is terrible :(";
    setMessage(msg);
  }, [wallets]);

  return (
    <div className="flex flex-col p-8">
      {message} <br />
    </div>
  );
};
export default Score;
