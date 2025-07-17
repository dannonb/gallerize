import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEditImageModal } from "@/hooks/use-edit-image-modal";
import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

interface ImageDisplayProps {
  images: ImageType[];
}

export default function ImageDisplay({ images }: ImageDisplayProps) {
  const editImageModal = useEditImageModal();

  const openImageEditor = (image: ImageType) => {
    editImageModal.setImageData(image);
    editImageModal.onOpen();
  };
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 pt-4 place-items-center">
          {images
            .map((image) => (
              <Button
                className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-md overflow-hidden border"
                onClick={() => openImageEditor(image)}
                key={image.id}
              >
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={image?.cdnUrl}
                  loading="lazy"
                />
              </Button>
            ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{images.length}</strong> image(s)
        </div>
      </CardFooter>
    </Card>
  );
}
