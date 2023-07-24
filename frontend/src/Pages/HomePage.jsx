import { useSelector } from "react-redux";
import AddExpense from "../Components/AddExpense.jsx";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <div className="p-4 lg:grid lg:grid-cols-2 flex flex-col gap-4 justify-self-center">
      <AddExpense />
      <AddExpense />
    </div>
  ) : (
    <div className="text-center">
      <h1 className="text-9xl">🪙</h1>
      <h1 className="text-7xl font-extrabold mt-4">coinSense!</h1>
    </div>
  );
};
export default HomePage;
