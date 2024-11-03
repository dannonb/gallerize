"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { newAPIKey } from "@/lib/utils";

export const createApiKey = async (siteId: string, creatorId: string) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId || !siteId) {
      return;
    }

    const existingKey = await prisma.apiKey.findFirst({
      where: {
        siteId,
      },
    });

    if (existingKey) {
      console.log("An api key already exists for this site");
      return;
    }

    const key = newAPIKey();
    const dbKey = await prisma.apiKey.create({
      data: {
        key,
        siteId,
        creatorId,
      },
    });

    if (!dbKey) {
      return;
    }

    return key;
  } catch (e) {
    console.log(e);
  }
};

export const deleteApiKey = async (siteId: string, key: string) => {
  try {
    const existingKey = await prisma.apiKey.findFirst({
      where: {
        siteId,
        key,
      },
    });

    if (!key) {
      return;
    }

    const deletedKey = await prisma.apiKey.delete({
      where: {
        id: existingKey?.id,
        siteId,
        key,
      },
    });

    if (!deletedKey) {
      return;
    }

    return deletedKey;
  } catch (e) {
    console.log(e);
  }
};

export const authorizeApiKey = async (siteId: string, key: string) => {
  try {
    const site = await prisma.site.findFirst({
      where: {
        id: siteId,
      },
    });

    if (!site) return;

    const apiKey = await prisma.apiKey.findFirst({
      where: {
        siteId,
      },
    });

    if (!apiKey) return false;

    if (apiKey.key !== key) return false;

    return true;
  } catch (e) {
    console.log(e);
  }
};

export const getApiKey = async (siteId: string) => {
  try {
    const session = await auth();
    const userId = session?.user?.id

    if (!session || !userId) return;

    const site = await prisma.site.findFirst({
      where: {
        id: siteId,
      },
    });

    console.log(site);

    if (!site) return;

    if (site.userId !== userId && !site.contributors.includes(userId)) {
      console.log("No match");
      return;
    }

    const key = await prisma.apiKey.findFirst({
      where: {
        siteId,
      },
    });

    console.log("KEY: ", key)

    if (!key) return;

    return key.key;
  } catch (error) {
    console.log(error);
  }
};
