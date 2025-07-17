'use client'

import { usePathname } from "next/navigation"

export default function Heading() {
    const pathname = usePathname()

    const getHeading = () => {
        switch (true) {
            case pathname.includes('overview'):
                return 'Overview'
            case pathname.includes('documentation'):
                return 'Documentation'
            case pathname.includes('settings'):
                return 'Settings'
            default: 
                'Dashboard'
        }
    }
    return (
        <h2 className="text-3xl font-semibold hidden md:flex">{getHeading()}</h2>
    )
}