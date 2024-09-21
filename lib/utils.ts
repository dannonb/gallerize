import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { notFound } from "next/navigation"

import { components } from "@/components/dashboard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getComponentBySlug(slug: string) {
  return components[slug] || null
}
