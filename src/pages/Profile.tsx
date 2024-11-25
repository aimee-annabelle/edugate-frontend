import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../util/authStore";

export default function ProfilePage() {
    const user = useAuthStore().user;
    return(
        <div className="flex flex-col gap-5 rounded-lg bg-white w-1/2 h-1/2 mx-auto my-20 p-10 items-center justify-center">
            <UserCircleIcon className="w-24 h-24 text-blue-500" />
            <div className="flex justify-between items-center gap-10 w-1/2">
                <p className="text-sm text-gray-500">Name</p>
                <h1 className="text-lg font-medium">{user?.name}</h1>
            </div>
            <div className="flex justify-between w-1/2">
                <p className="text-sm text-gray-500">Email</p>
                <h1 className="text-lg font-medium">{user?.email}</h1>
            </div>
            <div className="flex justify-between w-1/2">
                <p className="text-sm text-gray-500">Role</p>
                <h1 className="text-lg font-medium">{user?.role}</h1>
            </div>
            <div className="flex justify-between w-1/2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit Profile</button>
            </div>
        </div>
    );
}