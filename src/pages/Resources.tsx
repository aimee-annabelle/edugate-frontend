import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getResources, deleteResource } from "../services/resources";
import AddResource from "../components/AddResource";
import EditResource from "../components/EditResource";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../util/authStore";
import { Resource, ResourceWithUser } from "../util/types";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useAuthStore().user;
  async function fetchResources() {
    setLoading(true);
    const data = await getResources();
    if (data) {
      const currentUserData = data.filter((resource: ResourceWithUser) => resource.creator._id === user?._id);
      setResources(currentUserData);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchResources();
  }, [user]);

  async function handleEdit(resource: Resource) {
    setSelectedResource(resource);
    setShowEditForm(true);
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resource?"
    );
    if (!confirmed) return;

    const result = await deleteResource(id);
    if (result) {
      toast.success("Resource deleted successfully");
      fetchResources();
    } else {
      toast.error("Failed to delete resource");
    }
  }

  return (
    <div className="flex flex-col mt-10 px-20 py-10 gap-5 w-full">
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-bold text-primary ${
            showAddForm ? "text-center w-full" : showEditForm ? "text-center w-full" : ""
          }`}
        >
          {showAddForm ? "Add New Resource" : showEditForm ? "Edit Resource" : "My Resources"}
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className={`bg-primary text-white px-4 py-2 rounded-md ${
            showAddForm ? "hidden" : showEditForm ? "hidden" : ""
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Add New Resource
        </button>
      </div>

      {showEditForm ? (
        <EditResource
          resource={selectedResource!}
          onSuccess={() => {
            setShowEditForm(false);
            fetchResources();
          }}
          onCancel={() => setShowEditForm(false)}
        />
      ) : showAddForm ? (
        <AddResource
          onSuccess={() => {
            setShowAddForm(false);
            fetchResources();
          }}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <div className="mt-5">
          {loading ? (
            <p>Loading...</p>
          ) : resources.length === 0 ? (
            <p>No resources found. Add your first resource!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Grade Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {resources.map((resource) => (
                    <tr key={resource._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resource.gradeLevel}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <EyeIcon className="w-6 h-6" />
                        </a>
                        <button onClick={() => handleEdit(resource)}>
                          <PencilIcon className="w-6 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="w-6 h-6" />
                        </button>

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
