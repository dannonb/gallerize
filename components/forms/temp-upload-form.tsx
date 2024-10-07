"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";

import { useOverviewData } from "@/hooks/use-overview-data";
import ImageDetails from "../ui/image-details";
import { createImages } from "@/actions/images";

interface TempUploadProps {
  siteId: string;
  galleryId: string;
  count: string;
}

const formSchema = z.object({
  images: z.array(
    z.object({
      src: z.string(),
      alt: z.string().optional(),
      link: z.string().optional(),
      isDraft: z.boolean().default(false),
      isArchived: z.boolean().default(false),
    })
  ),
});

type ProductFormValues = z.infer<typeof formSchema>;

const TempUploadForm = ({ siteId, galleryId, count }: TempUploadProps) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
        galleryId,
      }));

      const count = await createImages(completeData);

      let toastMessage = `${count} image(s) have been successfully added, thank you!`;

      if (!count) {
        toastMessage = `There has been an error uploading your images`;
      }

      router.refresh();
      router.push(`/`);

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex gap-4">
          <ImageUpload
            multiple={true}
            disabled={loading}
            onChange={(src) =>
              append({
                src,
                alt: "",
                link: "",
                isDraft: true,
                isArchived: false,
              })
            }
          />
          <Button disabled={loading} type="submit">
            Save
          </Button>
        </div>
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
  );
};

export default TempUploadForm;
