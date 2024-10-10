"use client";

import { useState } from "react";
import Image from "next/image";
import { IoTrashSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "./form";

import { useWatch } from "react-hook-form";
import { Separator } from "./separator";

interface ImageDetailsProps {
  field: any;
  control: any;
  index: number;
  remove: (index: number) => void;
}

export default function ImageDetails({
  field,
  control,
  index,
  remove,
}: ImageDetailsProps) {
  const [open, setOpen] = useState(false);

  const imageData = useWatch({
    control,
    name: `images.${index}`,
  });

  return (
    <Popover key={field.id} open={open} onOpenChange={setOpen}>
      <div className="relative w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-md overflow-hidden border">
        <div className="z-10 absolute top-2 right-2">
          <Button
            type="button"
            onClick={() => remove(index)}
            variant="destructive"
            size="icon"
          >
            <IoTrashSharp className="h-4 w-4" />
          </Button>
        </div>
        <div className="z-10 absolute top-2 left-2">
          <PopoverTrigger asChild>
            <Button type="button" variant="secondary">
              <TbListDetails className="h-4 w-4 mr-2" />
              <span className="hidden md:flex">Details</span>
            </Button>
          </PopoverTrigger>
        </div>
        <Image fill className="object-cover " alt="Image" src={imageData?.src} />
      </div>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Details</h4>
            <p className="text-sm text-muted-foreground">
              Set the details for the image.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <FormField
              control={control}
              name={`images.${index}.alt`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alt text</FormLabel>
                  <FormControl className="col-span-2 h-8">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`images.${index}.link`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image link</FormLabel>
                  <FormControl className="col-span-2 h-8">
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex">
              <FormField
                control={control}
                name={`images.${index}.isDraft`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Draft</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`images.${index}.isArchived`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button onClick={() => setOpen(false)}>Okay</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
