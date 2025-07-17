import { auth } from "@/auth";
import Hero from "@/components/landing/hero";
import LandingHeading from "@/components/landing/landing-heading";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col w-full items-center justify-between relative h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/gallerease-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 w-full h-full object-cover dark:bg-black/90 bg-white/80" />
      <div className="h-full w-full">
        <div className="bg-gray-200 h-full dark:bg-[#1B1B1F] lg:p-12">
          <div className="relative">
            <LandingHeading />
          </div>
        </div>
      </div>
    </main>
  );
}
