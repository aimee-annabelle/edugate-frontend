import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import getToken from "../../util/auth";

export default function ProtectedLayout() { 
    const token = getToken();

    return (
        <main className="flex">
        <Sidebar />
        {token ? <Outlet /> : <Navigate to="/login" replace />}
        </main>
    );
}

