import Header from "@/components/header/header";
import { Analytics } from "@vercel/analytics/next"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <Analytics />
      <Header />
      {children}
    </div>
  );
}
