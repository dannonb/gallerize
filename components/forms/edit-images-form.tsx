import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Separator } from "../ui/separator";

import { useOverviewData } from "@/hooks/use-overview-data";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { deleteImage, editImage } from "@/actions/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEditImageModal } from "@/hooks/use-edit-image-modal";
import Image from "next/image";
import { IoTrashSharp } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

interface EditImageProps {
  image: any;
}

const formSchema = z.object({
  src: z.string(),
  galleryId: z.string(),
  alt: z.string().optional(),
  link: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).max(5),
  isDraft: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

type EditImageFormValues = z.infer<typeof formSchema>;

export default function EditImageForm({ image }: EditImageProps) {
  const params = useParams();
  const router = useRouter();

  const [tagInput, setTagInput] = useState('');

  const { galleries } = useOverviewData();
  const editImageModal = useEditImageModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<EditImageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: image,
    mode: "onChange",
  });

  const addTag = () => {
    const trimmed = tagInput.trim();
    const currentTags = form.getValues('tags');

    if (trimmed && !currentTags.includes(trimmed)) {
      form.setValue('tags', [...currentTags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues('tags');
    const updated = [...currentTags];
    updated.splice(index, 1);
    form.setValue('tags', updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: EditImageFormValues) => {
    try {
      setLoading(true);

      console.log(data);
      const updated = await editImage(image?.id!, data);

      router.refresh();

      if (!updated) return;

      const toastMessage = `image ${updated.id} has been updated`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      editImageModal.onClose();
    }
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);

      await deleteImage(id);

      router.refresh();

      const toastMessage = `image ${id} has been deleted`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      editImageModal.onClose();
    }
  };

  return (
    <Drawer>
      <div className="flex flex-col md:flex-row gap-4 relative w-[240px] h-[240px] lg:w-[400px] lg:h-[400px] rounded-md overflow-hidden border mx-auto">
        <Image
          fill
          className="object-cover"
          alt="Image"
          src={editImageModal.image?.cdnUrl || ""}
        />
        <DrawerContent>
          <DrawerTitle className="sr-only">Edit Image</DrawerTitle>
          <DrawerDescription className="sr-only">
            Edit selected image
          </DrawerDescription>
          <div className="grid gap-2 w-full max-w-lg mx-auto p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="galleryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gallery</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternative Text</FormLabel>
                        <FormControl className="col-span-2 h-8">
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
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
                        <FormLabel>Link</FormLabel>
                        <FormControl className="col-span-2 h-8">
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tag</FormLabel>
                          <FormControl className="col-span-2 h-8">
                            <div className="flex items-center justify-between space-x-2">
                              <Input
                                placeholder="Enter tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addTag}
                              >
                                Add Tag
                              </Button>
                            </div>
                          </FormControl>
                          {field.value.length > 0 && (
                            <div className="flex flex-wrap gap-2 m-2">
                              {field.value.map((t, index) => (
                                <Badge
                                  key={index}
                                  className="flex items-center text-sm px-3 shadow-sm"
                                >
                                  <span className="mr-2">{t}</span>
                                  <button
                                    onClick={() => removeTag(index)}
                                    className="text-gray-500"
                                    aria-label="Remove tag"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <FormDescription>
                            Tags are used to categorize your images within a
                            gallery (max of 5)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                  <div className="w-full flex items-center justify-evenly space-x-4">
                    <DrawerClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        disabled={loading}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </DrawerClose>
                    <Button type="submit" disabled={loading} className="w-full">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </div>
      <div className="w-full flex items-center justify-center space-x-4 pt-8">
        <div>
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={() => onDelete(image.id)}
          >
            <IoTrashSharp className="h-4 w-4" />
            <span>Remove</span>
          </Button>
        </div>
        <div>
          <DrawerTrigger asChild>
            <Button type="button" variant="secondary">
              <TbListDetails className="h-4 w-4 mr-2" />
              <span>Details</span>
            </Button>
          </DrawerTrigger>
        </div>
      </div>
    </Drawer>
  );
}
