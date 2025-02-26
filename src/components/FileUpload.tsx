import React, { ChangeEvent, useState } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  bucket_name: string;
  onFileSelect: (bucket_name: string, file: File) => void;
}

export function FileUpload({ bucket_name, onFileSelect }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        alert('File size exceeds the limit of 10 MB. Please choose a smaller file.');
        return; // Stop further execution
      }

      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket_name', bucket_name.toLocaleLowerCase()); // Add bucket name to the request
      console.log({ formData });
      console.log({ bucket_name });

      try {
        const response = await fetch('http://54.243.34.91:8000/upload/', {
        // const response = await fetch('http://127.0.0.1:8000/upload/', {
          method: 'POST',
          body: formData, // Include the FormData with both file and bucket name
        });

        if (!response.ok) {
          throw new Error('Failed to upload file');
        }

        const data = await response.json();
        console.log('File upload successful:', data);
        alert(`File uploaded successfully: ${data.file_name}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      } finally {
        setIsUploading(false);
      }

      onFileSelect(bucket_name, file);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <label
        htmlFor={`file-upload-${bucket_name}`}
        className={`flex items-center gap-2 text-sm font-medium ${
          isUploading ? 'text-gray-400' : 'text-indigo-600 hover:text-indigo-700'
        } cursor-pointer`}
      >
        <Upload className="w-4 h-4" />
        {isUploading ? 'Uploading...' : 'Upload Files'}
        <input
          id={`file-upload-${bucket_name}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
          disabled={isUploading}
        />
      </label>
    </div>
  );
}