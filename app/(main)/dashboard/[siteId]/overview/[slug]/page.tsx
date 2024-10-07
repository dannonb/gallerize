import { getComponentBySlug } from "@/lib/utils";
import OverviewProvider from "@/providers/overview-provider";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Overview({
  params,
}: {
  params: { siteId: string; slug: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const images = await prisma.image.findMany({
    where: {
        siteId: params.siteId
    }
  });

  const galleries = await prisma.gallery.findMany({
    where: {
        siteId: params.siteId
    },
    include: {
      images: true
    }
  });

  return (
    <OverviewProvider images={images} galleries={galleries}>
      {getComponentBySlug(params.slug)}
    </OverviewProvider>
  );
}
