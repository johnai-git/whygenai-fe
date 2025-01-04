import React, { ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  agentId: string;
  onFileSelect: (agentId: string, file: File) => void;
}

export function FileUpload({ agentId, onFileSelect }: FileUploadProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(agentId, file);
    }
  };

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <label 
        htmlFor={`file-upload-${agentId}`}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer"
      >
        <Upload className="w-4 h-4" />
        Upload Files
        <input
          id={`file-upload-${agentId}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
      </label>
    </div>
  );
}