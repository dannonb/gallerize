import { auth } from "@/auth";
import { redirect } from "next/navigation";

import SiteSwitcher from "@/components/header/site-switcher";
import prisma from "@/lib/prisma";
import DashboardNavbar from "@/components/header/dashboard-navbar";
import Heading from "@/components/dashboard/heading";
import { EditImageModalProvider } from "@/providers/edit-image-modal-provider";

export default async function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { siteId: string | null }
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    redirect("/api/auth/login?callbackUrl=/dashboard");
  }

  if (!params.siteId || params.siteId === 'null') {
    const site = await prisma.site.findFirst({
      where: {
        userId,
      }
    })

    if (!site) {
      redirect('/')
    }

    redirect(`/dashboard/${site.id}/overview/upload`)
  }

  const sites = await prisma.site.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex w-full">
      <EditImageModalProvider />
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-8 md:max-w-64 max-w-full">
        <div className="mx-auto grid w-full gap-2">
          <SiteSwitcher items={sites} />
        </div>
        <div className="mx-auto grid w-full gap-2">
          <Heading />
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <DashboardNavbar />
          <div className="grid gap-6 md:hidden">{children}</div>
        </div>
      </div>
      <div className="hidden w-full p-8 md:block">
          <div className="grid gap-6">{children}</div>
        </div>
    </div>
  );
}
