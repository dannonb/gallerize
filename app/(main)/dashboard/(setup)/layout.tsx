import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (!session?.user) {
        redirect('/auth/login')
    }

    const site = await prisma.site.findFirst({
        where: {
            userId: session.user.id
        }
    })

    if (site) {
        redirect(`/dashboard/${site.id}/overview/upload`)
    }

    return (
        <>
            {children}
        </>
    )
}