"use client";

import { useEffect, useState } from "react";

import { NotFoundModal } from "@/components/modals/not-found-modal";

export const NotFoundModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <NotFoundModal />
        </>
    )
}