import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth()

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/dashboard')
    }

    return (
        <div>{children}</div>
    )
}