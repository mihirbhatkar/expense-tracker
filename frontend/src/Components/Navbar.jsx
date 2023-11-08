import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../Components/ThemeSwitcher.jsx";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 font-semibold">
      <div className="flex-1">
        <Link className="text-xl lg:text-3xl p-2 font-bold " to={"/"}>
          <img
            src="./images/dollar.png"
            className="w-12 h-12 lg:inline mr-2 hidden"
            alt=""
          />
          <span className="">stackSense</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Sign Up</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
