"use client";

import { useEffect } from "react";

import { useNotFoundModal } from "@/hooks/use-not-found-modal";

const NotFoundPage = () => {
    const onOpen = useNotFoundModal((state) => state.onOpen)
    const isOpen = useNotFoundModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }
    }, [isOpen, onOpen])
  return (
    <div>
        
    </div>
  )
}

export default NotFoundPage