"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const createImage = async () => {};

export const createImages = async (images: any) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
    }

    const { count } = await prisma.image.createMany({
      data: images,
    });

    return count;
  } catch (e) {
    console.log(e);
  }
};

export const createImagesUsingTempLink = async (
  images: any,
  token: string
) => {};

export const editImage = async (id: string, data: any) => {
  try {
    const updatedImage = await prisma.image.update({
      where: {
        id,
      },
      data,
    });

    console.log(updatedImage);
    return updatedImage;
  } catch (e) {
    console.log(e);
  }
};

export const deleteImage = async (id: string) => {
  try {
    const deletedImage = await prisma.image.delete({
      where: { id },
    });

    console.log(deletedImage);
    return deletedImage;
  } catch (error) {
    console.log(error);
  }
};
