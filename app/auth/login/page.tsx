import LoginForm from "@/components/forms/login-form"
import { Suspense } from "react"
 
export default function SignIn() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}