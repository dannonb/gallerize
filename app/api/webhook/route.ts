import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from 'stripe'
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret)
    return new NextResponse("Missing Webhook Secret", { status: 500 });

  if (!signature)
    return new NextResponse("Missing Stripe Signature", { status: 400 });

  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const subscriptionId = session?.subscription;
      const userId = session?.metadata?.userId;
      //await updateDatabase(userId, subscriptionId);
      if (!subscriptionId || !userId) return
      console.log(subscriptionId, userId)
      const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            subscriptionId: (subscriptionId as string)
        }
      })
      console.log("USER SUBSCRIPTION: ", updatedUser)
    }
    return new NextResponse(null, { status: 200 });
  } catch {
    return new NextResponse("Invalid Stripe Signature", { status: 400 });
  }
}