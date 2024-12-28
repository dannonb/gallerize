"use server"

import { auth } from "@/auth";
import { tiers } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const getCheckoutSession = async (priceId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.id) {
    throw new Error('user not found')
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    throw new Error("user not found");
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/pricing",
    cancel_url: "http://localhost:3000/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: user?.email || "",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: user.id,
    },
    subscription_data: {
      trial_settings: {
        end_behavior: {
          missing_payment_method: "cancel",
        },
      },
      trial_period_days: 7,
    },
  });

  return checkoutSession;
};

export const getSubscriptionData = async (subscriptionId: string) => {
    try {
      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId
      );

      return subscription
    } catch (error) {
      console.log(error)
    }
}

export const getUserTier = async (subscriptionId: string | null) => {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      throw new Error("User not found")
    }

    if (!subscriptionId) {
      return tiers.starter
    }

    const subscriptionData = await getSubscriptionData('sub_1QYydVLdx104FB4G2wcpKQb1')

    console.log("SUB DATA: ", subscriptionData?.items.data[0])

  } catch (error) {
    console.log(error)
  }
}