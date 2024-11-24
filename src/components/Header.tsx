import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
export default function Header() {
  const activeStyle = "text-primary underline underline-offset-8";
  const normalStyle = "hover:text-blue-400 text-gray-500 transition-colors";

  return (
    <header className="bg-white top-0 fixed w-full z-50 shadow-sm py-5 px-36">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-10">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-x-10 font-medium text-base">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => isActive ? activeStyle : normalStyle}
          >
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
}
