"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface FileWithPreview extends File {
  preview: string;
}

const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
};

export default function FileUploader() {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      if (rejectedFiles[0].errors[0].code === "file-too-large") {
        setError("File is too large. Max size is 20MB.");
      } else if (rejectedFiles[0].errors[0].code === "file-invalid-type") {
        setError(
          "Invalid file type. Only PDF, TXT, PPT, and PPTX files are allowed."
        );
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      setFile(newFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  const removeFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
  };

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
      } catch (err) {
        console.error("Error uploading file:", err);
        setError(
          "An error occurred while uploading the file. Please try again."
        );
      } finally {
        removeFile();
        setIsUploading(false);
      }
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case "application/pdf":
        return "PDF";
      case "text/plain":
        return "TXT";
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "PPT";
      default:
        return "FILE";
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the file here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop a file here, or click to select a file</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          (Only PDF, TXT, PPT, PPTX files up to 20MB are accepted)
        </p>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {file && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Selected File:</h2>
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded">
              <File className="text-gray-500" size={24} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {getFileTypeIcon(file.type)} -{" "}
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
              aria-label={`Remove ${file.name}`}
            >
              <X size={20} />
            </button>
          </div>
          <Button
            onClick={() => handleUpload()}
            className="mt-4 w-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload File
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
