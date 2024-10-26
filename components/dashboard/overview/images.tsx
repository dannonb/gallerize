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
import { File, ListFilter } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ImageDisplay from "./image-display";

enum filterTypes {
  none = 'all',
  active = 'active',
  draft = 'draft',
  archived = 'archived'
}

export default function ImagesPage() {
  const { images } = useOverviewData();


  const [shownImages, setShownImages] = useState(images)
  const [imageCount, setImageCount] = useState<number>(images.length)

  const filterImages = useCallback((filter: filterTypes) => {
    let filteredImages
    switch(filter) {
      case filterTypes.none:
        filteredImages = images
        break
      case filterTypes.active:
        filteredImages = images.filter((image: ImageType) => image.isArchived !== true && image.isDraft !== true)
        break
      case filterTypes.draft:
        filteredImages = images.filter((image: ImageType) => image.isDraft === true)
        break 
      case filterTypes.archived:
        filteredImages = images.filter((image: ImageType) => image.isArchived === true)
        break
    }
    return filteredImages
  }, [images])

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">
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
      <TabsContent value='all'>
        <ImageDisplay images={filterImages(filterTypes.none)} />
      </TabsContent>
      <TabsContent value='active'>
      <ImageDisplay images={filterImages(filterTypes.active)} />
      </TabsContent>
      <TabsContent value='draft'>
      <ImageDisplay images={filterImages(filterTypes.draft)} />
      </TabsContent>
      <TabsContent value='archived'>
      <ImageDisplay images={filterImages(filterTypes.archived)} />
      </TabsContent>
    </Tabs>
  );
}
