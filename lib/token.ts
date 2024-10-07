"use server";

import { auth } from "@/auth";
import { SignJWT, jwtVerify } from "jose";
import prisma from "./prisma";

interface ICreateLink {
  exp: string;
  count: string;
  galleryId: string | undefined;
  siteId: string | string[];
}

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any, expiration: string) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error: any) {
    if (error.code && error.code === "ERR_JWT_EXPIRED") {
      return { error: "This link has expired" };
    } else {
      return { error: "Failed to open link" };
    }
  }
}

export const createTempLink = async ({
  exp,
  count,
  galleryId,
  siteId,
}: ICreateLink) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: "User id is invalid" }
    }

    const payload = {
      count,
      galleryId,
      siteId,
    };

    const token = await encrypt(payload, `${exp} hours`);

    siteId = siteId as string;

    const savedToken = await prisma.tempLinkToken.create({
      data: {
        token,
        creatorId: userId,
        siteId,
      },
    });

    if (!savedToken) {
      return { error: 'An error has occured' };
    }
    return `http://localhost:3000/temporary-upload?token=${token}`;
  } catch (e) {
    console.log(e);
  }
};

export const verifyTempLink = async (token: string) => {
  try {
    const savedToken = await prisma.tempLinkToken.findFirst({
      where: {
        token,
      },
    });

    if (!savedToken) {
      return { error: 'An error has occured' };
    }

    // do some additional checks to make sure not exp, 
    //or possibly add a code for the user to input and check here

    const deletedToken = await prisma.tempLinkToken.delete({
      where: {
        id: savedToken.id
      }
    })

    const data = await decrypt(token);
    return data;
  } catch (e) {
    console.log(e);
  }
};
