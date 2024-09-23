"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const CreateSite = async (values: any) => {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return
    }

    const { name } = values
    
    try {
        const site = await prisma.site.create({
            data: {
                name,
                userId
            }
        })

        await prisma.gallery.create({
            data: {
                name: 'default',
                siteId: site.id
            }
        })

        console.log(site)
        return site
    } catch (e) {
        console.log(e)
    }
}