"use client"

import { useState } from "react"
import { Site } from "@prisma/client"
import { CheckIcon, ChevronsUpDown, PlusCircle, Computer } from 'lucide-react'
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useSiteModal } from "@/hooks/use-site-modal"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator
} from "@/components/ui/command"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface SiteSwitcherProps extends PopoverTriggerProps {
    items: Site[]
}

export default function SiteSwitcher({
    className,
    items = []
}: SiteSwitcherProps) {
    const siteModal = useSiteModal()
    const params = useParams()
    const router = useRouter()

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))

    const currentSite = formattedItems.find((item) => item.value === params.siteId)

    const [open, setOpen] = useState(false)

    const onSiteSelect = (site: { value: string, label: string }) => {
        setOpen(false)
        router.push(`/dashboard/${site.value}/overview/upload`)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button 
                    variant='outline'
                    size='sm'
                    role='combobox'
                    aria-expanded={open}
                    aria-label="Select a site"
                    className={cn('w-[150px] md:w-[200px] justify-between', className)}
                >
                    <Computer className="mr-2 h-4 w-4 hidden md:flex" />
                    <span className="truncate">{currentSite?.label}</span>
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] md:w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Sites..." />
                        <CommandEmpty>No site found.</CommandEmpty>
                        <CommandGroup heading="Sites">
                            {formattedItems.map((site) => (
                                <CommandItem
                                    key={site.value}
                                    onSelect={() => onSiteSelect(site)}
                                    className="text-sm"
                                >
                                    <Computer className="mr-2 h-4 w-4 hidden md:flex" />
                                    <span className="truncate">{site.label}</span>
                                    <CheckIcon className={cn(
                                        'ml-auto h-4 w-4', 
                                        currentSite?.value === site.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    siteModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}