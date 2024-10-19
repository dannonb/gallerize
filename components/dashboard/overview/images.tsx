"use client";

import EditImageForm from "@/components/forms/edit-images-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageDetails from "@/components/ui/image-details";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditImageModal } from "@/hooks/use-edit-image-modal";
import { useOverviewData } from "@/hooks/use-overview-data";
import { Image as ImageType } from "@prisma/client";
import { File, ListFilter, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";

export default function ImagesPage() {
  const { images } = useOverviewData();
  const editImageModal = useEditImageModal()

  const openImageEditor = (image: ImageType) => {
    editImageModal.setImageData(image)
    editImageModal.onOpen()
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Sort
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8 pt-4 place-items-center">
              {images.map((image) => (
                <Button
                  className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-md overflow-hidden border"
                  onClick={() => openImageEditor(image)}
                  key={image.id}
                >
                  <Image
                    fill
                    className="object-cover"
                    alt="Image"
                    src={image?.src}
                  />
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>{images.length}</strong> images
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
