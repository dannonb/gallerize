import { NotFoundModalProvider } from "@/providers/not-found-modal-provider";
import { SiteModalProvider } from "@/providers/site-modal-provider";
import { TempUploadModalProvider } from "@/providers/temp-upload-modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Sora } from "next/font/google";
import "./globals.css";

const inter = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallerease",
  description: "An easy way to manage galleries for freelancers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="w-full">
              <SiteModalProvider />
              <NotFoundModalProvider />
              <TempUploadModalProvider />
              <ToasterProvider />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
