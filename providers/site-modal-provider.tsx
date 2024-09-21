"use client";

import { useEffect, useState } from "react";

import { SiteModal } from "@/components/modals/site-modal";

export const SiteModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <SiteModal />
        </>
    )
}