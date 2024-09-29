'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function TempUploadError({ message }: { message: string }) {

    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.replace('/')
        }, 3000)
    }, [])

    return (
        <div>{message}</div>
    )
}