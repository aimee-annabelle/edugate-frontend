import { useState, useEffect } from "react";

import { PencilIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../util/authStore";
import { UserDto } from "../util/types";
import EditUser from "../components/EditUser";
import { getUsers, updateUser } from "../services/users";
import toast from "react-hot-toast";

export default function UsersPage() {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuthStore().user;

  async function fetchUsers() {
    setLoading(true);
    const data = await getUsers();
    if (data) {
      setUsers(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleEdit(user: UserDto) {
    setSelectedUser(user);
    setShowEditForm(true);
    try {
      const editedUser = await updateUser(user._id, user);
      if (editedUser) {
        toast.success("User updated successfully");
      }
    } catch (error) {
      toast.error(`Failed to update user: ${error}`);
    }
  }

  // async function handleDelete(id: string) {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this user?"
  //   );
  //   if (!confirmed) return;

  //   const result = await deleteUserService(id);
  //   if (result) {
  //     toast.success("User deleted successfully");
  //     fetchUsers();
  //   } else {
  //     toast.error("Failed to delete user");
  //   }
  // }

  return (
    <div className="flex flex-col mt-10 px-20 py-10 gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">
          {showEditForm ? "Edit User" : "Users Management"}
        </h1>
      </div>

      {showEditForm ? (
        <EditUser
          user={selectedUser!}
          onSuccess={() => {
            setShowEditForm(false);
            fetchUsers();
          }}
          onCancel={() => setShowEditForm(false)}
        />
      ) : (
        <div className="mt-5">
          {loading ? (
            <p>Loading...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                        <button
                          onClick={() => handleEdit(user)}
                          disabled={currentUser?._id === user._id}
                          className="disabled:opacity-50"
                        >
                          <PencilIcon className="w-6 h-6" />
                        </button>
                        {/* <button
                          onClick={() => handleDelete(user._id)}
                          disabled={currentUser?._id === user._id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
