import { create } from "zustand";

interface useNotFoundModalInterface {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNotFoundModal = create<useNotFoundModalInterface>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))