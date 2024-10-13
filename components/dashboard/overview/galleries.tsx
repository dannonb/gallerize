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

export default function GalleriesPage() {
  const { galleries } = useOverviewData();
  const galleryModal = useGalleryModal();

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
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon">
                          <Settings2 className="h-4 w-4" />
                        </Button>
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
