"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const params = useParams();

  const determineLinkType = () => {
    switch (true) {
      case pathname.includes("overview"):
        return "overview";
      case pathname.includes("documentation"):
        return "documentation";
      case pathname.includes("settings"):
        return "settings";
      default:
        return "overview";
    }
  };

  const links = {
    overview: [
      {
        name: "Upload",
        href: "/overview/upload",
      },
      {
        name: "Images",
        href: "/overview/images",
      },
      {
        name: "Galleries",
        href: "/overview/galleries",
      },
      // {
      //   name: "Stats",
      //   href: "/overview/stats",
      // },
    ],
    documentation: [
      {
        name: "Uploads",
        href: "/documentation/uploading-images",
      },
      {
        name: "API",
        href: "/documentation/api",
      },
    ],
    settings: [
      // {
      //   name: "General",
      //   href: "/settings/general",
      // },
      // {
      //   name: "Access",
      //   href: "/settings/access",
      // },
      {
        name: "API Keys",
        href: "/settings/api-keys",
      },
      // {
      //   name: "Integrations",
      //   href: "/settings/integrations",
      // },
      {
        name: "Support",
        href: "/settings/support",
      },
      // {
      //   name: "Advanced",
      //   href: "/settings/advanced",
      // },
    ],
  };

  return (
    <nav className="flex overflow-scroll md:overflow-hidden text-nowrap md:grid gap-4 text-sm text-muted-foreground">
      {links[determineLinkType()].map((link) => (
        <Button asChild variant='outline' size='sm' key={link.href} className="w-1/2">
          <Link href={`/dashboard/${params.siteId}${link.href}`} className={pathname === `/dashboard/${params.siteId}${link.href}` ? "font-semibold text-primary" : ""}>
            {link.name}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
