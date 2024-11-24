import { NavLink } from "react-router-dom";
import { HomeIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo-light.svg";

export default function Sidebar() {
    return (
        <div className="bg-blue-600 text-white h-screen w-64">
            <div className="p-4 flex items-center gap-2 text-white">
                <img src={logo} alt="logo" />
            </div>
            <nav className="flex flex-col">
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 text-lg
                        ${isActive ? 'bg-blue-400/30 w-full' : 'hover:bg-blue-700'}
                    `}
                >
                    <HomeIcon className="w-6 h-6" />
                    Home
                </NavLink>
                <NavLink 
                    to="/students" 
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 text-lg
                        ${isActive ? 'bg-blue-400/30 w-full' : 'hover:bg-blue-700'}
                    `}
                >
                    <AcademicCapIcon className="w-6 h-6" />
                    Students
                </NavLink>
            </nav>
        </div>
    );
}


