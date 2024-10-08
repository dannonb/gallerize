"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useTempUploadModal } from "@/hooks/use-temp-upload";
import { Clock, GalleryHorizontal, Images } from "lucide-react";
import { useParams } from "next/navigation";
import { useOverviewData } from "@/hooks/use-overview-data";
import { createTempLink } from "@/lib/token";
import TempUploadPage from "@/app/(main)/(temp)/temporary-upload/page";

export const TempUploadModal = () => {
  const tempUploadModal = useTempUploadModal();
  const { galleries } = useOverviewData();

  const { siteId } = useParams();

  const defaultGallery = galleries.find(
    (gallery: any) => gallery.name === "default"
  );

  const [loading, setLoading] = useState(false);
  const [exp, setExp] = useState("3");
  const [galleryId, setGalleryId] = useState(defaultGallery?.id);
  const [count, setCount] = useState("20");
  const [link, setLink] = useState<any>("");

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Temporary upload link was copied to clipboard!");
  };

  useEffect(() => {
    if (tempUploadModal.isOpen) {
      const makeLink = async () => {
        const tempLink = await createTempLink({
          exp,
          count,
          galleryId,
          siteId,
        });
        setLink(tempLink);
      };
      makeLink();
    }
  }, [exp, count, galleryId, siteId, tempUploadModal.isOpen]);

  return (
    <Modal
      title="Temporary Upload Link"
      description="This link will allow someone to add images to this site without having to be a contributor."
      isOpen={tempUploadModal.isOpen}
      onClose={tempUploadModal.onClose}
    >
      <div className="flex space-x-2">
        <Input value={link} readOnly />
        <Button
          variant="secondary"
          className="shrink-0"
          onClick={() => onCopy(link)}
        >
          Copy Link
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Customize your link</h4>
        <div className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <GalleryHorizontal />
              <div>
                <p className="text-sm font-medium leading-none">Gallery</p>
                <p className="text-sm text-muted-foreground">
                  Select the image destination.
                </p>
              </div>
            </div>
            <Select
              defaultValue={defaultGallery?.id}
              onValueChange={(value) => setGalleryId(value)}
            >
              <SelectTrigger className="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {galleries.map((gallery) => (
                  <SelectItem key={gallery.id} value={gallery.id}>
                    {gallery.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Images />
              <div>
                <p className="text-sm font-medium leading-none">Image count</p>
                <p className="text-sm text-muted-foreground">
                  Limit of uploaded images.
                </p>
              </div>
            </div>
            <Input
              type="number"
              defaultValue={count}
              className="ml-auto w-[110px]"
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Clock />
              <div>
                <p className="text-sm font-medium leading-none">Expiration</p>
                <p className="text-sm text-muted-foreground">
                  How long this link will last.
                </p>
              </div>
            </div>
            <Select defaultValue="3" onValueChange={(value) => setExp(value)}>
              <SelectTrigger className="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Hour</SelectItem>
                <SelectItem value="3">3 Hours</SelectItem>
                <SelectItem value="12">12 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Modal>
  );
};
