"use client";

import { MdOutlineAddAPhoto } from "react-icons/md";
import { CldUploadWidget } from "next-cloudinary";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// import ImageDetails from "./image-details";

interface ImageUploadProps {
  max?: number;
  multiple: boolean;
  disabled?: boolean;
  onChange: (value: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  max,
  multiple,
  disabled,
  onChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="r5absd4a"
        options={{ multiple, maxFiles: max }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <MdOutlineAddAPhoto className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
