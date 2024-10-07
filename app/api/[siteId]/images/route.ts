import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export async function GET(
    req: Request,
    { params }: { params: { siteId: string } }
) {
    try {
        console.log("hitting api")
        if (!params.siteId) {
            return new NextResponse("Site id is required", { status: 400 })
        }

        const images = await prisma.image.findMany({
            where: {
                siteId: params.siteId
            }
        })

        return NextResponse.json(images)
    } catch (error) {
        console.log('[IMAGES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}