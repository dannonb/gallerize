import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButton() {
    return (
        <Button asChild size="lg"><Link href='/auth/login'>Login</Link></Button>
    )
}