"use client";

import { useEffect, useState } from "react";

import { GalleryModal } from "@/components/modals/gallery-modal";

export const GalleryModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <GalleryModal />
        </>
    )
}