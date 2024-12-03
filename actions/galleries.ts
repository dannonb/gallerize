"use server"

import { auth } from "@/auth";
import prisma from "@/lib/prisma"

export const createGallery = async (siteId: string, data: any) => {
    try {
        const session = await auth();
        const userId = session?.user?.id;
      
        if (!userId) {
          return;
        }

        if (!siteId) {
            return
        }

        const gallery = await prisma.gallery.create({
            data: {
                siteId,
                ...data
            }
        })

        if (!gallery) {
            return 
        }
        return gallery
    } catch (error) {
        console.log(error)
    }   
}

export const editGallery = async (id: string, data: any) => {
    try {
        const isDefault = await prisma.gallery.count({
            where: {
                id,
                name: "default"
            }
        })

        if (isDefault) {
            return
        }

        const updatedGallery = await prisma.gallery.update({
            where: {
              id,
            },
            data,
          });

          console.log(updatedGallery)

          return updatedGallery
    } catch (error) {
        console.log(error)
    }
}

export const deleteGallery = async (id: string) => {
    try {
        const isDefault = await prisma.gallery.count({
            where: {
                id,
                name: "default"
            }
        })

        if (isDefault) {
            return
        }

        const deletedGallery = await prisma.gallery.delete({
            where: { id },
          });
      
          console.log(deletedGallery);
          return deletedGallery;
    } catch (error) {
        console.log(error)
    }
}