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

const handleLogin = async (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: '/dashboard'
    });
}

export default function LoginForm() {
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
