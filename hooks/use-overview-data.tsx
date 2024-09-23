import { create } from "zustand";
import { Image, Gallery } from "prisma/prisma-client"

interface useOverviewDataInterface {
    images: Image[];
    galleries: Gallery[];
    setImages: (images: any) => void;
    setGalleries: (galleries: any) => void;
}

export const useOverviewData = create<useOverviewDataInterface>((set) => ({
    images: [],
    galleries: [],
    setImages: (images) => set({ images }),
    setGalleries: (galleries) => set({ galleries })
}))