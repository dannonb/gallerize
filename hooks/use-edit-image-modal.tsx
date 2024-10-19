import { Image } from "@prisma/client";
import { create } from "zustand";

interface useEditImageModalInterface {
    isOpen: boolean;
    image: Image | null;
    onOpen: () => void;
    onClose: () => void;
    setImageData: (image: Image) => void
}

export const useEditImageModal = create<useEditImageModalInterface>((set) => ({
    isOpen: false,
    image: null,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setImageData: (image: Image) => set({ image })
}))