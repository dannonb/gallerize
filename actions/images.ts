"use server";

import prisma from "@/lib/prisma";

export const createImage = async () => {};

export const createImages = async (images: any) => {
  try {
    const { count } = await prisma.image.createMany({
      data: images,
    });

    return count;
  } catch (e) {
    console.log(e);
  }
};
