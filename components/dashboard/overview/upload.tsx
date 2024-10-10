'use client'

import UploadForm from "@/components/forms/upload-form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useTempUploadModal } from "@/hooks/use-temp-upload";

export default function UploadPage() {
  const tempUpload = useTempUploadModal();

  const title = "Add images";
  const description = "Add new images to your collection";
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <Button className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white" onClick={() => tempUpload.onOpen()}>
          Temp Link
        </Button>
      </div>
      <Separator />
      <UploadForm />
    </div>
  );
}
