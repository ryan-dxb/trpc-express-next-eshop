"use client";

import React, { FC, useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "ui";

interface ImageUploadProps {}

interface Image {
  name: string;
  url: string;
}

const ImageUpload: FC<ImageUploadProps> = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const selectFiles = () => {
    fileUploadRef.current?.click();
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    console.log(files![0].type.split("/")[0]);

    if (files?.length === 0) return;

    if (files) {
      // Only allow 4 images
      // Check if the file is an image
      for (let i = 0; i < files.length; i++) {
        if (files.length > 4) break;
        if (images.length >= 4) break;

        // Add the file to the images array and check if its more than 4
        if (images.length + files.length > 4) break;

        if (files[i].type.split("/")[0] !== "image") continue;

        // Check if the file is too large
        if (files[i].size > 1024 * 1024 * 2) continue; // 2MB

        // Check if the file is already added
        // Continue if all checks are passed
        if (!images.some((image) => image.name === files[i].name)) {
          setImages((prevImages) => [
            ...prevImages,
            {
              name: files[i].name,
              url: URL.createObjectURL(files[i]),
            },
          ]);
        }
      }
    }
  };

  console.log(images);

  return (
    <>
      <div className="flex items-center justify-center w-full h-40 border border-dashed">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload size={32} className="text-muted-foreground" />
          <span className="text-sm text-gray-400">
            Drag and drop or{" "}
            <span
              role="button"
              onClick={selectFiles}
              className="cursor-pointer text-primary/50"
            >
              click to upload
            </span>
            <input
              type="file"
              className="hidden"
              multiple
              ref={fileUploadRef}
              onChange={onFileSelect}
            />
          </span>
          <span className="text-xs text-muted-foreground">
            (Max upto 4 images)
          </span>
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
          images.map((image) => (
            <div className="flex flex-col border aspect-square">
              <div className="flex flex-1 ">
                <div className="relative w-full h-full bg-gray-50">
                  <Image
                    src="/product-camera.jpg"
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
