import { NavLink, useNavigate } from "react-router-dom";
import { HomeIcon, RectangleStackIcon, UserIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo-light.svg";
import { useAuthStore } from "../util/authStore";

export default function Sidebar() {
    const navigate = useNavigate();
    function handleLogout() {
        useAuthStore.getState().logout();
        navigate("/");
    }
    return (
        <div className="bg-blue-600 sticky left-0 top-0 bottom-0 text-white h-screen w-64 flex flex-col gap-24 py-10">
            <div className="p-4 flex items-center gap-2 text-white self-end px-10">
                <img src={logo} alt="logo" />
            </div>
            <nav className="flex flex-col text-center">
                <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => `
                        flex items-center gap-3 pl-16 py-5 text-lg font-semibold
                        ${isActive ? 'bg-blue-400/30 w-full' : 'hover:bg-blue-700'}
                    `}
                    end
                >
                    <HomeIcon className="w-6 h-6" />
                    Home
                </NavLink>
                <NavLink 
                    to="resources" 
                    className={({ isActive }) => `
                        flex items-center gap-3 pl-16 py-5 text-lg font-medium
                        ${isActive ? 'bg-blue-400/30 w-full' : 'hover:bg-blue-700'}
                    `}
                >
                    <RectangleStackIcon className="w-6 h-6" />
                    Resources
                </NavLink>
                <NavLink 
                    to="profile" 
                    className={({ isActive }) => `
                        flex items-center gap-3 pl-16 py-5 text-lg font-medium
                        ${isActive ? 'bg-blue-400/30 w-full' : 'hover:bg-blue-700'}
                    `}
                >
                    <UserIcon className="w-6 h-6" />
                    Profile
                </NavLink>
            </nav>
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-3 pl-16 py-5 text-lg font-medium text-orange-400" onClick={handleLogout}>
                    <ArrowRightEndOnRectangleIcon className="w-6 h-6" />
                    Logout
                </button>
            </div>
        </div>
    );
}


