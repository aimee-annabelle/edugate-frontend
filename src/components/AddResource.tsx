// src/components/AddResource.tsx
import { useState } from "react";
import toast from "react-hot-toast";
import FileUploader from "./FileUploader";
import { addResource } from "../services/resources";

interface AddResourceProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddResource({ onSuccess, onCancel }: AddResourceProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const resource = {
      title: (e.currentTarget.elements.namedItem("title") as HTMLInputElement)
        .value,
      description: (
        e.currentTarget.elements.namedItem("description") as HTMLInputElement
      ).value,
      type: (e.currentTarget.elements.namedItem("type") as HTMLInputElement)
        .value,
      subject: (e.currentTarget.elements.namedItem("subject") as HTMLInputElement)
        .value,
      gradeLevel: (e.currentTarget.elements.namedItem("gradeLevel") as HTMLInputElement)
        .value,
      fileUrl: fileUrl as string,
    };
    setLoading(true);
    const newResource = await addResource({
      title: resource.title as string,
      description: resource.description as string,
      type: resource.type as string,
      subject: resource.subject as string,
      gradeLevel: resource.gradeLevel as string,
      fileUrl: fileUrl as string,
    });
    if (newResource) {
      console.log(newResource);
      toast.success("Resource added successfully");
      onSuccess();
    } else {
      toast.error("Failed to add resource");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-1/2 self-center"
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
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
        className="border border-gray-300 rounded-md p-2"
          required
        />
      </div>
      <div className="flex flex-col gap-5">
        <FileUploader
          setFileUrl={setFileUrl}
          acceptedFormats={[".pdf", ".jpg", ".jpeg", ".png"]}
          maxSize={25}
        />
      </div>
      <div className="flex gap-4">
        <button
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
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
