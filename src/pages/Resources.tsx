import toast from "react-hot-toast";
import FileUploader from "../components/FileUploader";
import { useState } from "react";
import { addResource, Resource } from "../services/resources";
export default function ResourcesPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const resource = Object.fromEntries(formData.entries()) as Resource;
    setLoading(true);
    const newResource = await addResource({ ...resource, fileUrl: fileUrl as string });
    if (newResource) {
      toast.success("Resource added successfully");
      (e.target as HTMLFormElement).reset();
      setFileUrl(null);
    } else {
      toast.error("Failed to add resource");
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col mt-10 px-20 py-10 gap-5 w-full">
      <h1 className="text-2xl font-bold text-primary">Add Resources</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="border-2 xl:w-1/3 border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="border-2 xl:w-1/3 border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Type</label>
          <input
            type="text"
            placeholder="Type"
            className="border-2 xl:w-1/3 border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="border-2 xl:w-1/3 border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <label className="font-bold">Grade Level</label>
          <input
            type="text"
            placeholder="Grade Level"
            className="border-2 xl:w-1/3 border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="flex flex-col gap-5 xl:w-1/3">
          <FileUploader
            setFileUrl={setFileUrl}
            acceptedFormats={[".pdf"]}
            maxSize={25}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md xl:w-1/3"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
