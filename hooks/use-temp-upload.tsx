import { create } from "zustand";

interface useTempUploadModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useTempUploadModal = create<useTempUploadModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))