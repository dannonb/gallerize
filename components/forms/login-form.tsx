'use client'

import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const params = useSearchParams()

  const redirect = params.get('redirect')

  const handleLogin = async (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: redirect ? redirect : '/dashboard'
    });
}
 
  useEffect(() => {
    const error = params.get('error')

    if (error === "OAuthAccountNotLinked") {
      toast.error("Email is already in use")
    }

  }, [params])

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please login with your gmail or github account
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center w-full gap-x-2">
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => handleLogin("google")}
          >
            <FcGoogle className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => handleLogin("github")}
          >
            <FaGithub className="h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
