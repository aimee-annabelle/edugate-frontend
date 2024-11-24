import { useAuthStore } from "../util/authStore";

export default function Dashboard() {
    return <div>
        <h1>Dashboard</h1>
        <p>Welcome, {useAuthStore.getState().user?.name}</p>
    </div>;
}

