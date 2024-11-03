import { auth } from "@/auth";
import { getComponentBySlug } from "@/lib/utils";
import React from 'react'

export default async function Settings({ params }: { params: { slug: string, siteId: string } }) {
    const session = await auth()
    return (
        <div>{React.cloneElement(
            getComponentBySlug(params.slug),
            { params, session }
        )}</div>
    )
}