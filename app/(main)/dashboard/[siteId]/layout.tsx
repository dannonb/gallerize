import { auth } from "@/auth";
import { redirect } from "next/navigation";

import SiteSwitcher from "@/components/header/site-switcher";
import prisma from "@/lib/prisma";
import DashboardNavbar from "@/components/header/dashboard-navbar";
import Heading from "@/components/dashboard/heading";
import { EditImageModalProvider } from "@/providers/edit-image-modal-provider";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    redirect("/api/auth/login?callbackUrl=/dashboard");
  }

  const sites = await prisma.site.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex w-full flex-col">
      <EditImageModalProvider />
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-16">
        <div className="mx-auto grid w-full gap-2">
          <SiteSwitcher items={sites} />
        </div>
        <div className="mx-auto grid w-full gap-2">
          <Heading />
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <DashboardNavbar />
          <div className="grid gap-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
