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