"use client";

import { useEffect, useState } from "react";

import { TempUploadModal } from "@/components/modals/temp-upload-modal";

export const TempUploadModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <TempUploadModal />
        </>
    )
}