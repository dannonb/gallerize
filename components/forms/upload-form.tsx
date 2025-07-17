"use client";

import { useCallback, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useOverviewData } from "@/hooks/use-overview-data";
import ImageDetails from "../ui/image-details";
import { createImages } from "@/actions/images";
import { ImagePlus, Wand } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { uploadImageToS3 } from "@/actions/upload";

const formSchema = z.object({
  images: z.array(
    z.object({
      originalUrl: z.string(),
      cdnUrl: z.string(),
      galleryId: z.string(),
      file: z.instanceof(File),
      preview: z.any(),
      description: z.string().optional(),
      alt: z.string().optional(),
      link: z.string().optional(),
      isDraft: z.boolean().default(false),
      isArchived: z.boolean().default(false),
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
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: [] },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "images",
    control: form.control,
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        try {
          reader.onload = () => append({
            originalUrl: '',
            cdnUrl: '',
            file,
            preview: reader.result,
            description: "",
            alt: "",
            link: "",
            isDraft: true,
            isArchived: false,
            galleryId: "",
          });
          reader.readAsDataURL(file);
          form.clearErrors("images");
        } catch (error) {
          setPreview(null);
          form.resetField("images");
        }
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 30,
      maxSize: 10000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      console.log(data)
      const results = await Promise.all(
        data.images.map(async (image) => {
          const response = await uploadImageToS3(image.file.name, image.file.type)

          if (!response) {
            return
          }

          const { url, fields } = response

          const formData = new FormData()
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value as string)
          })
          formData.append('file', image.file)

          const imageUrl = `${response.url}${response.fields.key}`

          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formData,
          })

          if (uploadResponse.ok) {
            return {
              ...image,
              originalUrl: imageUrl,
              cdnUrl: `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DISTRO}${response.fields.key}`
            }
          } else {
            console.error('S3 Upload Error:', uploadResponse)
          }
        })
      )

      const completeData = results.map((image) => {
        const img = {
          ...image,
          siteId,
          galleryId: data.galleryId,
        }

        delete img.file
        delete img.preview
        return img
      });

      const count = await createImages(completeData);

      router.refresh();
      router.push(`/dashboard/${siteId}/overview/images`);

      const toastMessage = `${count} image(s) successfully added`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex flex-col md:space-x-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0 p-8 items-center">
            <FormField
              control={form.control}
              name="galleryId"
              render={({ field }) => (
                <FormItem className="">
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
            {/* <div className="border rounded-md p-4 space-x-2 bg-gallerease-gradient">
              <Button variant='outline' className="p-2"><Wand /> <span className="pl-1">Alt Tags</span></Button>
              <Button variant='outline' className="p-2"><Wand /> <span className="pl-1">Descriptions</span></Button>
            </div> */}
          </div>
          <div className="w-full space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem className="mx-auto md:w-1/2">
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                    >
                      <ImagePlus
                        className={`size-20 md:size-40`}
                      />
                      <Input {...getInputProps()} type="file" multiple={true} max={30} />
                      {isDragActive ? (
                        <p>Drop the image!</p>
                      ) : (
                        <p>Click here or drag an image to upload it</p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage>
                    {fileRejections.length !== 0 && (
                      <p>
                        Image must be less than 10MB and of type png, jpg, or jpeg
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.getValues().images.length}
              className="mx-auto block h-auto rounded-md px-4 py-2 text-xl"
              variant={'secondary'}
            >
              Save
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-4 place-items-center">
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

export default UploadForm;
