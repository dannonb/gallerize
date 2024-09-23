"use client";

import Link from "next/link";
import { Menu, Image } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { usePathname, useParams } from "next/navigation";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const pathname = usePathname();
  const params = useParams();

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
      href: `/dashboard/${params.siteId}/settings/general`,
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
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
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
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-muted-foreground transition-colors hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}