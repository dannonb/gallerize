import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { components } from "@/components/dashboard"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getComponentBySlug(slug: string) {
  return components[slug] || components.notFound
}

export function createAPIKey(){
  return "sk_gal_" + crypto.randomUUID().replaceAll("-", "")
}
