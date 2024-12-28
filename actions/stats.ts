import prisma from "@/lib/prisma"
import fs from "fs"

export const getTotalImages = async (siteId: string) => {
    try {
        const imageCount = await prisma.image.count({
            where: {
                siteId
            }
        })
    
        return imageCount
    } catch (error) {
        console.log(error)
    }
}

export const getTotalGalleries = async (siteId: string) => {
    try {
        const galleryCount = await prisma.gallery.count({
            where: {
                siteId
            }
        })
    
        return galleryCount
    } catch (error) {
        console.log(error)
    }
}

export const getTotalStorageSize = async (siteId: string) => {
    let total = 0
    try {
        const images = await prisma.image.findMany({
            where: {
                siteId
            }
        })

        if (!images.length) {
            return total
        }

        for (let i = 0; i < images.length; i++) {
            fs.stat(images[0].src, (err, stats) => {
                if (err) return
                total += stats.size
            })
        }
    
        return total
    } catch (error) {
        console.log(error)
    }
}