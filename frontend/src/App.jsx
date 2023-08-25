import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "./Components/ThemeSwitcher.jsx";
import Navbar from "./Components/Navbar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "./Slices/usersApiSlice.js";
import { clearCredentials } from "./Slices/authSlices.js";
import { clearWalletsData } from "./Slices/walletsSlice.js";
import AddExpense from "./Components/AddExpense.jsx";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(clearWalletsData());
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };
  return userInfo ? (
    <>
      <div className="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div
            className=" sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content"
          >
            <div className="navbar bg-base-100 font-semibold">
              <div className="flex-1">
                <label
                  aria-label="Open menu"
                  htmlFor="drawer"
                  className="btn btn-square btn-ghost drawer-button lg:hidden"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                  >
                    <path
                      stroke="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
                <Link className="text-3xl p-2 font-bold lg:hidden " to={"/"}>
                  <img src="./images/dollar.png" className="w-12 h-12" alt="" />
                </Link>
              </div>
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-4">
                  <ThemeSwitcher />
                  <label
                    htmlFor="transactionModal"
                    className="btn btn-accent font-bold"
                  >
                    ADD
                  </label>
                </ul>
              </div>
            </div>
          </div>

          <Outlet />

          {/* Page content here */}
        </div>
        <div className="drawer-side z-40">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 sm:w-80 h-full bg-base-200 space-y-2 text-base-content text-lg">
            {/* Sidebar content here */}
            <li className="  mb-4">
              <Link className="text-3xl p-2 font-bold" to={"/"}>
                <img src="./images/dollar.png" className="w-12 h-12" alt="" />
                stackSense
              </Link>
            </li>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/expenses"}>Expenses</Link>
            </li>
            <li>
              <Link to={"/wallets"}>Wallets</Link>
            </li>
            <li>
              <Link to={"/insights"}>Insights</Link>
            </li>

            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="transactionModal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-slate-100">
          <AddExpense></AddExpense>

          <label
            htmlFor="transactionModal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
        </div>
      </div>

      <ToastContainer />
    </>
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
