import { useSelector } from "react-redux";
import AddExpense from "../Components/AddExpense.jsx";
import RecentExpenses from "../Components/RecentExpenses.jsx";
import Score from "../Components/Score.jsx";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? (
    <div className="p-4 lg:grid lg:grid-cols-2 lg:justify-self-center gap-4 flex flex-col ">
      <span className="font-bold">Welcome, {userInfo.name} 👋</span>
      <Score />
      {/* <AddExpense /> */}
      <RecentExpenses />
    </div>
  ) : (
    <div className="text-center flex justify-center items-center flex-col min-h-[var(--min-page-height)] text-4xl font-bold">
      <div className="mb-[var(--navbar-height)] gap-16 flex lg:flex-row flex-col items-center justify-center">
        <div>
          <h1 className="text-8xl">💵</h1>
          <h1 className="text-6xl font-extrabold mt-4 hidden lg:block ">
            stackSense!
          </h1>
        </div>
        <div className="w-96">
          Financial <span className="text-emerald-500">finesse</span> <br /> at
          your fingertips. <br />
          <span className="text-xl font-light w-6 ">
            Your go-to expense tracker web app for mastering your finances.{" "}
            Effortlessly manage expenses, gain financial insights, and stack up
            your savings for a brighter future
          </span>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
