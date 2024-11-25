import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser } from "../services/users";
import { UserDto } from "../util/types";

interface EditUserProps {
  user: UserDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditUser({ user, onSuccess, onCancel }: EditUserProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedUser = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement)
        .value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement)
        .value,
      role: (e.currentTarget.elements.namedItem("role") as HTMLSelectElement)
        .value,
    };

    setLoading(true);
    const result = await updateUser(user._id, updatedUser);
    if (result) {
      toast.success("User updated successfully");
      onSuccess();
    } else {
      toast.error("Failed to update user");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2 self-center">
      <div className="flex flex-col gap-5 w-full">
        <label className="font-bold">Name</label>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          className="border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <label className="font-bold">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={user.email}
          className="border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <label className="font-bold">Role</label>
        <select
          name="role"
          defaultValue={user.role}
          className="border border-gray-300 rounded-md p-2"
          required
        >
          <option value="student">Student</option>
          <option value="educator">Educator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
} 