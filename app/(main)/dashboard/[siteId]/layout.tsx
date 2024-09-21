import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Link from "next/link"
import SiteSwitcher from "@/components/header/site-switcher";
import prisma from "@/lib/prisma";
import DashboardNavbar from "@/components/header/dashboard-navbar";

export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth()
    const userId = session?.user?.id

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    }

    const sites = await prisma.site.findMany({
      where: {
          userId
      }
  }) 

    return (
      <div className="flex min-h-screen w-full flex-col">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
        <SiteSwitcher items={sites} />
        </div>
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h2 className="text-3xl font-semibold">Settings</h2>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <DashboardNavbar />
          <div className="grid gap-6">
            {children}
          </div>
        </div>
      </div>
    </div>
    )
}