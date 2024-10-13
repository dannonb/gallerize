import { create } from "zustand";

interface useGalleryModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useGalleryModal = create<useGalleryModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))