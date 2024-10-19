"use server";

import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs" 

import { auth } from "@/auth";
import prisma from "./prisma";

interface ICreateLink {
  passcode?: string;
  exp: string;
  count: string;
  galleryId: string | undefined;
  siteId: string | string[];
  origin: string;
}

interface IPayload {
  passcode: string | null;
  count: string | undefined;
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
  passcode,
  exp,
  count,
  galleryId,
  siteId,
  origin
}: ICreateLink) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return { error: "User id is invalid" }
    }

    const payload: IPayload = {
      passcode: null,
      count,
      galleryId,
      siteId,
    };

    if (passcode) {
      const hashedPasscode = await bcrypt.hash(passcode, 8)
      payload.passcode = hashedPasscode
    }

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
    return `${origin}/temporary-upload?token=${token}`;
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

    const payload = await decrypt(token);

    return { id: savedToken.id, data: payload };
  } catch (e) {
    console.log(e);
  }
};

export const deleteTempUploadToken = async (id: string) => {
  try {
    await prisma.tempLinkToken.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const compareTokenPasscodes = async (passcode: string, tokenId: string) => {
  try {
    const token = await prisma.tempLinkToken.findFirst({
      where: {
        id: tokenId
      }
    })

    if (!token) {
      return
    }

    const payload = await decrypt(token.token)
    
    return await bcrypt.compare(passcode, payload.passcode as string)
  } catch (error) {
    console.log(error)
  }
}
