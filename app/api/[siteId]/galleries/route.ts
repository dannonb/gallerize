import { NextResponse } from "next/server"
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

        const galleries = await prisma.gallery.findMany({
            where: {
                siteId: params.siteId
            }
        })

        return NextResponse.json(galleries)
    } catch (error) {
        console.log('[GALLERIES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}