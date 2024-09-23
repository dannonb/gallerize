"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";

import { useOverviewData } from "@/hooks/use-overview-data";
// import ImageDetails from "../ui/image-details";
import { IoTrashSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import Image from "next/image";
import { Label } from "../ui/label";
import ImageDetails from "../ui/image-details";
import prisma from "@/lib/prisma";
import { createImages } from "@/actions/images";

const formSchema = z.object({
  images: z.array(
    z.object({
      src: z.string(),
      galleryId: z.string(),
      alt: z.string().optional(),
      link: z.string().optional(),
    })
  ),
  galleryId: z.string(),
});

type ProductFormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const params = useParams();
  const router = useRouter();
  const { galleries } = useOverviewData();

  const { siteId } = params;

  const [loading, setLoading] = useState(false);

  const title = "Add images";
  const description = "Add new images to your collection";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: [] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);

      const completeData = data.images.map((image) => ({
        ...image,
        siteId,
        galleryId: data.galleryId,
      }));

      const count = await createImages(completeData);

      router.refresh();
      router.push(`/dashboard/${siteId}/overview/images`);

      const toastMessage = `${count} image(s) have been successfully added`
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="galleryId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a gallery"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {galleries.map((gallery) => (
                        <SelectItem key={gallery.id} value={gallery.id}>
                          {gallery.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
          <ImageUpload
            multiple={true}
            disabled={loading}
            onChange={(src) =>
              append({
                src,
                alt: "",
                link: "",
                galleryId: "",
              })
            }
          />
          <div className="flex flex-wrap items-start gap-4 pt-4">
            {fields.map((field, index) => (
              <ImageDetails
                key={field.id}
                control={form.control}
                field={field}
                index={index}
                remove={remove}
              />
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
