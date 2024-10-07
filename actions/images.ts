"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const createImage = async () => {};

export const createImages = async (images: any) => {
  try {
    const session = await auth()
    const userId = session?.user?.id

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

export const createImagesUsingTempLink = async (images: any, token: string) => {

}

export const editImage = async () => {
  try {

  } catch (e) {
    console.log(e)
  }
}
