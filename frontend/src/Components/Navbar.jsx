import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../Components/ThemeSwitcher.jsx";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 font-semibold">
      <div className="flex-1">
        <Link className="text-3xl p-2 font-bold " to={"/"}>
          💵<span className="">stackSense</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li className="mt-1 text-lg">
            <ThemeSwitcher />
          </li>

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
