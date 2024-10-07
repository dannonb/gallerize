'use client'

import { useOverviewData } from '@/hooks/use-overview-data'
import { Gallery, Image } from '@prisma/client';
import { useEffect } from 'react';

interface OverviewProviderProps {
    images: Image[];
    galleries: Gallery[];
    children: React.ReactNode
}

export default function OverviewProvider({ images, galleries, children }: OverviewProviderProps) {
    const { setImages, setGalleries } = useOverviewData()

    useEffect(() => {
        setImages(images)
        setGalleries(galleries)
    }, [images, galleries])
    return (
        <>{children}</>
    )
}