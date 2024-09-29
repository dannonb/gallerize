"use server"

import { SignJWT, jwtVerify } from "jose";

interface ICreateLink {
    exp: string;
    count: string;
    galleryId: string | undefined
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
    if (error.code && error.code === 'ERR_JWT_EXPIRED') {
      return { error: 'This link has expired' }
    } else {
      return { error: 'Failed to open link' }
    }
  }
}

export const createTempLink = async ({ exp, count, galleryId, siteId }: ICreateLink) => {
    const payload = {
        count,
        galleryId,
        siteId
    }

    const token = await encrypt(payload, `${exp} hours`)
    
    return `http://localhost:3000/temporary-upload?token=${token}`
}

export const verifyTempLink = async (token: string) => {
  const data = await decrypt(token)
  return data
}