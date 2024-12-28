"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";

import ImageDetails from "../ui/image-details";
import { createImages } from "@/actions/images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { deleteTempUploadToken } from "@/lib/token";

interface TempUploadProps {
  passcode: string;
  siteId: string;
  galleryId: string;
  count: string;
  tokenId: string;
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

const TempUploadForm = ({
  siteId,
  galleryId,
  count,
  passcode,
  tokenId,
}: TempUploadProps) => {
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

      if (data.images.length > parseInt(count)) {
        toast.error(
          `Exceeded upload limit of ${count}. Please remove some images`
        );
        return;
      }

      const completeData = data.images.map((image) => ({
        ...image,
        siteId,
        galleryId,
      }));

      const imageCount = await createImages(completeData);

      let toastMessage = `${imageCount} image(s) have been successfully added, thank you!`;

      if (!imageCount) {
        toastMessage = `There has been an error uploading your images`;
      }

      await deleteTempUploadToken(tokenId);

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
    <div className="w-full flex flex-col space-y-8">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Quick Upload</CardTitle>
        <CardDescription className="space-y-4">
          <p>Your uploaded images will be saved to the specified gallery automatically.</p>
          <p>Limit: {count}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        
      </CardContent>
    </Card>
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 w-full"
    >
      <div className="flex gap-4">
        <ImageUpload
          max={parseInt(count)}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pt-4 place-items-center">
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

export default TempUploadForm;
