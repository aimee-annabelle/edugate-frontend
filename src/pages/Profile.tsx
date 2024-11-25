import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../util/authStore";
import { useState } from "react";
import { api } from "../util/api";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.patch(`/users/${user?._id}`, formData);
            setUser(response.data);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="flex flex-col gap-5 rounded-lg bg-white w-1/2 h-1/2 mx-auto my-20 p-10 items-center justify-center">
            <UserCircleIcon className="w-24 h-24 text-blue-500" />
            {isEditing ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500">Name</label>
                        <input 
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500">Email</label>
                        <input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="flex justify-between w-full gap-4">
                        <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md w-1/2"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md w-1/2 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="flex justify-between items-center gap-10 w-1/2">
                        <p className="text-gray-500">Name</p>
                        <p>{user?.name}</p>
                    </div>
                    <div className="flex justify-between w-1/2">
                        <p className="text-gray-500">Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex justify-between w-1/2">
                        <p className="text-gray-500">Role</p>
                        <p>{user?.role}</p>
                    </div>
                    <div className="flex justify-between w-1/2">
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Edit Profile
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}