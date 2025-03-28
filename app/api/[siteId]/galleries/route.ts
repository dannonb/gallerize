import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { authorizeApiKey } from "@/actions/api-keys"

export async function GET(
    req: Request,
    { params }: { params: { siteId: string } }
) {
    const headers = req.headers
    const apiKey = headers.get("x-api-key")

    if (!apiKey) {
        return new NextResponse("Unauthorized", { status: 403 })
    }

    try {
        
        if (!params.siteId) {
            return new NextResponse("Site id is required", { status: 400 })
        }

        const site = await prisma.site.findFirst({
            where: {
                id: params.siteId
            }
        })

        if (!site) {
            return new NextResponse("This site does not exist", { status: 404 })
        }

        const isAuthorized = await authorizeApiKey(params.siteId, apiKey)

        if (!isAuthorized) {
            return new NextResponse("Forbidden", { status: 403 })
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