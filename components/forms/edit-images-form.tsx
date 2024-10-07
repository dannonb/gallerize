import { useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Separator } from "../ui/separator";

import { useOverviewData } from "@/hooks/use-overview-data";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface EditImageProps {
  image: any;
}

const formSchema = z.object({
  src: z.string(),
  galleryId: z.string(),
  alt: z.string().optional(),
  link: z.string().optional(),
  isDraft: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

type EditImageFormValues = z.infer<typeof formSchema>;

export default function EditImageForm({ image }: EditImageProps) {
  const params = useParams();
  const router = useRouter();

  const { galleries } = useOverviewData();

  const { siteId } = params;

  const [loading, setLoading] = useState(false);

  const form = useForm<EditImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: image,
    mode: "onChange",
  });

  const onSubmit = async (data: EditImageFormValues) => {
    try {
      setLoading(true);

      console.log(data);

      //   router.refresh();
      //   router.push(`/dashboard/${siteId}/overview/images`);

      let count;

      const toastMessage = `${count} image(s) successfully saved`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Details</h4>
          <p className="text-sm text-muted-foreground">
            Edit the details of the image.
          </p>
        </div>
        <Separator />
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="alt"
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
            control={form.control}
            name="link"
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
              control={form.control}
              name="isDraft"
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
              control={form.control}
              name="isArchived"
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
        </div>
      </div>
    </Form>
  );
}
