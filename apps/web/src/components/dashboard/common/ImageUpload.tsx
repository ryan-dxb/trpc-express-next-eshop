"use client";

import React, { FC, useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "ui";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {}

interface Image {
  name: string;
  url: string;
}

const ImageUpload: FC<ImageUploadProps> = () => {
  const [images, setImages] = useState<Image[]>([]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    maxFiles: 4,
    maxSize: 1024 * 1024 * 2,
    multiple: true,

    onDrop: (acceptedFiles: File[]) => {
      for (let i = 0; i < acceptedFiles.length; i++) {
        if (acceptedFiles.length > 4) break;
        if (images.length >= 4) break;

        // Add the file to the images array and check if its more than 4
        if (images.length + acceptedFiles.length > 4) break;

        if (acceptedFiles[i].type.split("/")[0] !== "image") continue;

        // Check if the file is too large
        if (acceptedFiles[i].size > 1024 * 1024 * 2) continue; // 2MB

        // Check if the file is already added
        // Continue if all checks are passed
        if (!images.some((image) => image.name === acceptedFiles[i].name)) {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: acceptedFiles[i].name,
              url: URL.createObjectURL(acceptedFiles[i]),
            },
          ]);
        }
      }
    },
  });

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const deleteImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };
  return (
    <>
      <div
        {...getRootProps({
          className:
            "flex items-center justify-center w-full h-40 border border-dashed",
        })}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload size={32} className="text-muted-foreground" />
          {isDragActive ? (
            <span className="text-sm text-gray-400">Drop the files here</span>
          ) : (
            <>
              <span className="text-sm text-gray-400">
                Drag and drop or{" "}
                <span className="cursor-pointer text-primary/50">
                  click to upload
                </span>
              </span>
              <span className="text-xs text-muted-foreground">
                (Max upto 4 images)
              </span>
            </>
          )}

          <input type="file" className="hidden" multiple {...getInputProps()} />
        </div>
      </div>

      <div className="grid grid-cols-4 col-span-2 gap-4 p-4 mt-4 border">
        {images.length === 0 && (
          <div className="flex flex-col items-center justify-center col-span-4">
            <h3 className="text-lg font-semibold">No images uploaded yet</h3>
            <span className="text-sm text-gray-400">
              Upload upto 4 images for your product
            </span>
          </div>
        )}
        {images &&
          images.map((image, index) => (
            <div key={index} className="flex flex-col border aspect-square">
              <div className="flex flex-1 ">
                <div className="relative w-full h-full bg-gray-50">
                  <Image
                    src={image.url}
                    fill
                    alt="product image"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600"
                  onClick={(e) => deleteImage(e, index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ImageUpload;
