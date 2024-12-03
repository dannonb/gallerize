"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListFilter, PlusCircle, Trash2, Settings2, Code2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useOverviewData } from "@/hooks/use-overview-data";
import { GalleryModalProvider } from "@/providers/gallery-modal-provider";
import { useGalleryModal } from "@/hooks/use-gallery-modal";
import { useState } from "react";
import { deleteGallery } from "@/actions/galleries";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GalleriesPage() {
  const { galleries } = useOverviewData();
  const galleryModal = useGalleryModal();

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const onDelete = async (id: string) => {
    try {
      setLoading(true);

      await deleteGallery(id);

      router.refresh();

      const toastMessage = `gallery ${id} has been deleted`;
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GalleryModalProvider />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              className="h-7 gap-1"
              onClick={() => galleryModal.onOpen()}
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Gallery
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Galleries</CardTitle>
              <CardDescription>
                Manage your galleries to ensure they fit your needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {galleries.map((gallery) => (
                  <AccordionItem key={gallery.id} value={gallery.id}>
                    <AccordionTrigger>{gallery.name}</AccordionTrigger>
                    <AccordionContent>
                      <div>{gallery.id}</div>
                      {/* @ts-ignore */}
                      <div>Images: {gallery.images.length}</div>
                      <div>
                        Description:{" "}
                        {gallery.description || "No description provided"}
                      </div>
                      {/* <div>Creation date: {n}</div>
                    <div>Last Updated: {new Date(gallery.updatedAt)}</div> */}
                      <div className="flex mt-4 space-x-4">
                        {gallery.name !== "default" && (
                          <>
                            <Button variant="destructive" size="icon" onClick={() => onDelete(gallery.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {/* <Button size="icon" onClick={() => setIsEditing(true)}>
                              <Settings2 className="h-4 w-4" />
                            </Button> */}
                          </>
                        )}
                        <Button variant="secondary" size="icon">
                          <Code2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>{galleries.length}</strong>{" "}
                {galleries.length === 1 ? "gallery" : "galleries"}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
