"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { uploadImageToS3 } from "@/actions/upload";

interface ImageUploadProps {
  max?: number;
  multiple: boolean;
  disabled?: boolean;
  onChange: (value: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  max,
  multiple,
  disabled,
  onChange,
}) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");

  const formSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        try {
          reader.onload = () => setPreview(reader.result);
          reader.readAsDataURL(acceptedFiles[0]);
          form.setValue("image", acceptedFiles[0]);
          form.clearErrors("image");
        } catch (error) {
          setPreview(null);
          form.resetField("image");
        }
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 100000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      const data = await uploadImageToS3(values.image.name, values.image.type)

      console.log("DATA: ", data)

      // if (data && data.url) {
      //   onChange(data.url)
      // }

      toast.success(`Image uploaded successfully 🎉 ${values.image.name}`);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <div className="space-y-4">
          
          <Button
            disabled={form.formState.isSubmitting}
            className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ImageUpload
