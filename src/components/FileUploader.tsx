import { ChangeEvent, useState } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { CLOUDINARY_CONFIG } from '../util/cloudinary';

interface FileUploaderProps {
  onFileSelect?: (file: File) => void;
  setFileUrl: (url: string) => void;
  maxSize?: number;
  acceptedFormats?: string[];
}

export default function FileUploader({
  onFileSelect,
  setFileUrl,
  maxSize = 25,
  acceptedFormats = ['.jpeg', '.jpg', '.png'],
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size check
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // File type check
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!acceptedFormats.includes(fileExtension)) {
      toast.error(`Only ${acceptedFormats.join(', ')} files are allowed`);
      return;
    }

    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

      const response = await fetch(CLOUDINARY_CONFIG.uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      // Update state and pass data to parent component
      setSelectedFile(file);
      if (onFileSelect) onFileSelect(file);
      setFileUrl(data.secure_url);
      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileUrl('');
  };

  const formatList = acceptedFormats.map(format => format.replace('.', '')).join(', ');

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="relative">
        <input
          type="file"
          onChange={handleFileUpload}
          accept={acceptedFormats.join(',')}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDrop={() => setIsDragging(false)}
          disabled={uploading}
        />
        <div 
          className={`
            border-2 border-dashed rounded-lg p-8
            ${isDragging ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}
            ${uploading ? 'opacity-75' : ''}
            flex flex-col items-center justify-center gap-2
            transition-all duration-200
          `}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center gap-4">
              {previewUrl && (
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveFile}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <>
              <CloudArrowUpIcon className={`w-8 h-8 text-primary ${uploading ? 'animate-bounce' : ''}`} />
              <p className="text-lg font-medium">
                {uploading ? 'Uploading...' : 'Drop file or browse'}
              </p>
              <p className="text-sm text-gray-500">
                Format: {formatList} & Max file size: {maxSize} MB
              </p>
              <button 
                className={`
                  mt-2 px-6 py-2 bg-primary text-white rounded-md 
                  ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-400'}
                  transition-all duration-200
                `}
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  'Browse Files'
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
