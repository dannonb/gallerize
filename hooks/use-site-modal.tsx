import { create } from "zustand";

interface useSiteModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useSiteModal = create<useSiteModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))