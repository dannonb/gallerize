// import { getCheckoutSession, getUserTier } from "@/actions/payments";
import { auth } from "@/auth";


import { tierData } from '@/lib/constants'
import { Button } from "../ui/button";

export default async function Pricing() {
  const session = await auth();
  const userId = session?.user?.id;

  // const getNextPath = (priceId: string | null) => {
  //   if (!userId) {
  //     return '/sign-in?redirect="/pricing"';
  //   }
  //   return `/payments/checkout?id=${priceId}`
  // };

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Gallerease we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {tierData.map((tier) => (
            <div key={tier.priceId} className="flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">{tier.label}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              {tier.description}
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">{tier.price}</span>
            </div>

            <ul role="list" className="mb-8 space-y-4 text-left">
              {tier.features.map((feature) => (
                <li className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>{feature}</span>
              </li>
              ))}
            </ul>
            <Button
              disabled={true}
              className="text-white bg-gradient-to-tr from-indigo-800 via-blue-600 to-cyan-400 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              {tier.label !== "Starter" ? "Coming soon..." : !userId ? "Sign in" : "Current plan"}
            </Button>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
