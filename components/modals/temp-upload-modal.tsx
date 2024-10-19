"use client";

import { useState, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useTempUploadModal } from "@/hooks/use-temp-upload";
import { Clock, GalleryHorizontal, Images } from "lucide-react";
import { useParams } from "next/navigation";
import { useOverviewData } from "@/hooks/use-overview-data";
import { createTempLink } from "@/lib/token";
import { useOrigin } from "@/hooks/use-origin";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { cn } from "@/lib/utils";

const tempUploadFormSchema = z.object({
  passcode: z.string().optional(),
  exp: z.enum(["1", "3", "12"]),
  count: z.string(),
  galleryId: z.string(),
});

export const TempUploadModal = () => {
  const tempUploadModal = useTempUploadModal();
  const { galleries } = useOverviewData();
  const origin = useOrigin();

  const { siteId } = useParams();

  const defaultGallery = galleries.find(
    (gallery: any) => gallery.name === "default"
  );

  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState<any>("");
  const [usePasscode, setUsePasscode] = useState(false);

  const form = useForm<z.infer<typeof tempUploadFormSchema>>({
    resolver: zodResolver(tempUploadFormSchema),
    defaultValues: {
      passcode: "",
      exp: "3",
      galleryId: defaultGallery?.id,
      count: "20",
    },
  });

  const generateLink = async (values: z.infer<typeof tempUploadFormSchema>) => {
    try {
      setLoading(true);

      const { passcode, exp, count, galleryId } = values;
      const tempLink = await createTempLink({
        passcode,
        exp,
        count,
        galleryId,
        siteId,
        origin,
      });
      setLink(tempLink);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Temporary upload link was copied to clipboard!");
  };

  useEffect(() => {
    if (!tempUploadModal.isOpen) {
      setLink("");
    }
  }, [tempUploadModal.isOpen]);

  return (
    <Modal
      title="Temporary Upload Link"
      description="This link will allow someone to add images to this site without having to be a contributor."
      isOpen={tempUploadModal.isOpen}
      onClose={tempUploadModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(generateLink)}>
          <div className="flex space-x-2">
            {link ? (
              <div className="w-full flex space-x-2">
                <Input value={link} readOnly />
                <Button
                  variant="secondary"
                  className="shrink-0"
                  type="button"
                  onClick={() => onCopy(link)}
                >
                  Copy Link
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 w-full">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={usePasscode}
                    onCheckedChange={() => setUsePasscode(!usePasscode)}
                  />
                  <p>require passcode</p>
                </div>
                {usePasscode && (
                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="passcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="secret passcode"
                              required={usePasscode}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {!link && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Customize your link</h4>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="galleryId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between space-x-4">
                          <FormLabel>
                            <div className="flex items-center space-x-4">
                              <GalleryHorizontal />
                              <div>
                                <p className="text-sm font-medium leading-none">
                                  Gallery
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Select the image destination.
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              defaultValue={defaultGallery?.id}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="ml-auto w-[110px]">
                                <SelectValue
                                  defaultValue={defaultGallery?.id}
                                  placeholder="Select"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {galleries.map((gallery) => (
                                  <SelectItem
                                    key={gallery.id}
                                    value={gallery.id}
                                  >
                                    {gallery.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between space-x-4">
                          <FormLabel>
                            <div className="flex items-center space-x-4">
                              <Images />
                              <div>
                                <p className="text-sm font-medium leading-none">
                                  Image count
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Limit of uploaded images.
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="ml-auto w-[110px]"
                              {...field}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="exp"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between space-x-4">
                          <FormLabel>
                            <div className="flex items-center space-x-4">
                              <Clock />
                              <div>
                                <p className="text-sm font-medium leading-none">
                                  Expiration
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  How long this link will last.
                                </p>
                              </div>
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Select
                              disabled={loading}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="ml-auto w-[110px]">
                                <SelectValue placeholder="Select" defaultValue={field.value} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Hour</SelectItem>
                                <SelectItem value="3">3 Hours</SelectItem>
                                <SelectItem value="12">12 Hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  type="submit"
                  className="w-full"
                >
                  Generate url
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </Modal>
  );
};
