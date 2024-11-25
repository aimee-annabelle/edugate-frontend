import { useState } from "react";
import toast from "react-hot-toast";
import { updateResource } from "../services/resources";
import { Resource } from "../util/types";

interface EditResourceProps {
  resource: Resource;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EditResource({ resource, onSuccess, onCancel }: EditResourceProps) {
  const [fileUrl, ] = useState<string>(resource.fileUrl);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedResource = {
      title: (e.currentTarget.elements.namedItem("title") as HTMLInputElement)
        .value,
      description: (
        e.currentTarget.elements.namedItem("description") as HTMLInputElement
      ).value,
      type: (e.currentTarget.elements.namedItem("type") as HTMLInputElement)
        .value,
      subject: (e.currentTarget.elements.namedItem("subject") as HTMLInputElement)
        .value,
      gradeLevel: (
        e.currentTarget.elements.namedItem("gradeLevel") as HTMLInputElement
      ).value,
      ...(fileUrl !== resource.fileUrl && { fileUrl }),
    };

    setLoading(true);
    const result = await updateResource(resource._id, updatedResource);
    if (result) {
      toast.success("Resource updated successfully");
      onSuccess();
    } else {
      toast.error("Failed to update resource");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/2 self-center">
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            defaultValue={resource.title}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Description</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            defaultValue={resource.description}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Type</label>
          <input
            type="text"
            placeholder="Type"
            name="type"
            defaultValue={resource.type}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            defaultValue={resource.subject}
            className="border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <label className="font-bold">Grade Level</label>
        <input
          type="text"
          placeholder="Grade Level"
          name="gradeLevel"
          defaultValue={resource.gradeLevel}
          className="border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex flex-col gap-5 w-full">
        {fileUrl && (
          <div className="flex flex-col gap-2">
            <label className="font-bold">Current File</label>
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark underline"
            >
              View Current File
            </a>
          </div>
        )}

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