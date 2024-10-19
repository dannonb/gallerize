"use client";

import { useEffect, useState } from "react";

import { EditImageModal } from "@/components/modals/edit-image-modal";

export const EditImageModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <EditImageModal />
        </>
    )
}