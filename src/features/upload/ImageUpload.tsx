import { api } from "@/lib/api";
import { Loader2, Upload, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  onUpload?: (file: File) => Promise<string>;
  onUrlChange: (url: string) => void;
  currentUrl?: string;
  setCurrentImage?: (image: string) => void;
  className?: string;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  filename: string;
  size: number;
  mimeType: string;
  url: string;
  etag: string;
}

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const defaultUploadImage = async (file: File): Promise<string> => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file);

    const response = await api.post<UploadResponse>("/upload", {
      file: base64Data,
      filename: file.name,
    });
    return response.data.url;
  } catch (error) {
    const failedErorr =
      error instanceof Error ? error.message : "Upload failed";
    toast.error(failedErorr);
  }
  return "";
};

export function ImageUpload({
  onUpload = defaultUploadImage,
  onUrlChange,
  currentUrl,
  setCurrentImage,
  className = "",
  maxSize = 2 * 1024 * 1024, // 2MB default
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sync preview with currentUrl when it changes
  useEffect(() => {
    setPreview(currentUrl || null);
  }, [currentUrl]);

  const handleFileValidation = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type not supported. Please upload: ${acceptedTypes
        .map((t) => t.split("/")[1].toUpperCase())
        .join(", ")}`;
    }
    if (file.size > maxSize) {
      return `File too large. Maximum size is ${(
        maxSize /
        (1024 * 1024)
      ).toFixed(1)}MB`;
    }
    return null;
  };

  const processFile = async (file: File) => {
    const validationError = handleFileValidation(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      setIsUploading(true);
      const uploadedUrl = await onUpload(file);

      // Update with the actual uploaded URL
      setPreview(uploadedUrl);
      onUrlChange(uploadedUrl);

      if (setCurrentImage) {
        setCurrentImage(uploadedUrl);
      }

      // Clean up the object URL
      URL.revokeObjectURL(previewUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentUrl || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [
      onUpload,
      maxSize,
      acceptedTypes,
      processFile,
      acceptedTypes,
      maxSize,
      onUpload,
    ]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only set dragging to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const removeImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setError(null);
    onUrlChange("");

    if (setCurrentImage) {
      setCurrentImage("");
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${preview ? "p-2" : "p-4"}
        `}
      >
        {!preview && (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mb-2">
              <Upload className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <label className="text-blue-600 hover:text-blue-500 cursor-pointer text-sm underline">
                Choose file
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(",")}
                  onChange={handleFileSelect}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Up to {(maxSize / (1024 * 1024)).toFixed(1)}MB
            </p>
          </div>
        )}

        {preview && (
          <div className="relative group">
            <img
              width={100}
              height={100}
              src={preview}
              alt="Preview"
              className="w-full h-20 object-cover rounded border"
              onError={(e) => {
                console.error("Image load error:", e);
                setError("Failed to load image");
                setPreview(null);
              }}
            />

            {!isUploading && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1 -right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                <div className="flex flex-col items-center text-white">
                  <Loader2 className="w-4 h-4 animate-spin mb-1" />
                  <span className="text-xs">Uploading...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-1 text-xs text-red-600 bg-red-50 border border-red-200 rounded p-1">
          {error}
        </div>
      )}
    </div>
  );
}
