"use client";

import Link from "next/link";
import { Menu, Image as ImageIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { usePathname, useParams } from "next/navigation";
import { useEffect } from "react";
import { useSiteParams } from "@/hooks/use-site-params";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const pathname = usePathname();
  const params = useParams();

  const { lastActiveSite, setLastActiveSite } = useSiteParams((state) => state);

  const handleCurrentSite = async () => {
    if (isLoggedIn) {
      const siteParam = params.siteId

      if (siteParam && siteParam !== null && siteParam !== lastActiveSite) {
        const param = typeof siteParam === "string" ? siteParam : siteParam[0]
        setLastActiveSite(param)
      } 

    } else {
      setLastActiveSite(null)
    }
  }

  useEffect(() => {
    handleCurrentSite()
  }, [params.siteId, isLoggedIn]);

  const dashboardLinks = [
    {
      name: "Overview",
      href: `/dashboard/${params.siteId}/overview/upload`,
    },
    {
      name: "Documentation",
      href: `/dashboard/${params.siteId}/documentation/uploading-images`,
    },
    {
      name: "Settings",
      href: `/dashboard/${params.siteId}/settings/api-keys`,
    },
  ];

  const landingLinks = [
    {
      name: "Getting Started",
      href: "/getting-started",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const links = isLoggedIn ? dashboardLinks : landingLinks;

  return (
    <div className="w-full">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
        >
          <Image src="/logo.png" alt="logo" height={70} width={70} />
          <span className="sr-only">Gallerease</span>
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              pathname === link.href
                ? "text-muted-foreground "
                : "text-foreground",
              "transition-colors hover:text-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="z-[999]">
          <nav className="grid gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <ImageIcon className="h-6 w-6" />
                <span className="sr-only">Gallerease</span>
              </Link>
            </SheetClose>
            {links.map((link) => (
              <SheetClose key={link.href} asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
