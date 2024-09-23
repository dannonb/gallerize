'use client'

import { useOverviewData } from '@/hooks/use-overview-data'
import { useEffect } from 'react';

interface OverviewProviderProps {
    images: any[];
    galleries: any[];
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