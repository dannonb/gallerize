'use client'

import { useSearchParams, useRouter } from "next/navigation";

export default function TempLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const router = useRouter()
    const token = useSearchParams().get('token')
    
    if (!token) {
        router.replace('/')
    }

    return (
        <div className="w-full">{children}</div>
    )
}